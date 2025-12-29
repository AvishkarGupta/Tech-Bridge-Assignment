import {Router} from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyjwt } from "../middlewares/auth.middelware.js";
import { loginRateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router()

router
  .route("/register")
  .post(upload.fields([{name: "avatar", maxCount: 1}]), registerUser)

router
  .route("/login")
  .post(loginRateLimiter, loginUser)

router
  .route("/logout")
  .get(verifyjwt, logoutUser)


export default router;