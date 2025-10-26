import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// Generate tokens and save refreshToken in DB
const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if ([fullname, email, username, password].some(f => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) throw new ApiError(409, "User already exists");

  // Upload avatar & cover
  const avatarPath = req.files?.avatar?.[0]?.path;
  const coverPath = req.files?.coverImage?.[0]?.path;

  if (!avatarPath) throw new ApiError(400, "Avatar image is required");

  const avatar = await uploadOncloudinary(avatarPath);
  const coverImage = coverPath ? await uploadOncloudinary(coverPath) : null;

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!(email || username)) throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) throw new ApiError(404, "User does not exist");

  const validPass = await user.isPasswordCorrect(password);
  if (!validPass) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Logged in successfully"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } });

  const options = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

  res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(400, "Token not found");

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(400, "Invalid refresh token");

    if (incomingRefreshToken !== user.refreshToken) throw new ApiError(400, "Refresh token expired");

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" };

    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
