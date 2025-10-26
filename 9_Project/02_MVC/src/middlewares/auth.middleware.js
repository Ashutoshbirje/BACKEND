import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from either cookie or Authorization header
    let token = req.cookies?.accessToken;

    if (!token) {
      const authHeader = req.header("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1].trim();
      }
    }

    if (!token) {
      throw new ApiError(401, "Unauthorized Access: Token Missing");
    }

    // Check token format
    if (token.split(".").length !== 3) {
      throw new ApiError(401, "Malformed Token");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw new ApiError(401, error?.message || "Invalid or Expired Token");
  }
});
