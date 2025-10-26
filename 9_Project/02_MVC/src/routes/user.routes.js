import {Router} from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const userrouter = Router();

userrouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);

userrouter.route("/login").post(
    loginUser
)

// secure route 

userrouter.route("/logout").post(verifyJWT, logoutUser)
userrouter.route("/refresh").post(refreshAccessToken)

export default userrouter;