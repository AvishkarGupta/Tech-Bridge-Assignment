import {Router} from "express"
import { createProject, getAllProject } from "../controllers/project.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyjwt } from "../middlewares/auth.middelware.js";

const router = Router()

router
  .route("/create")
  .post(verifyjwt, upload.fields([{name: "attachment", maxCount: 1}]), createProject)

router
  .route("/get-all")
  .get(verifyjwt, getAllProject)

// router
//   .route("/update")
//   .get(verifyjwt, logoutUser)


export default router;