import {Router} from "express"
import { createProject, getAllProject, getProject } from "../controllers/project.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyjwt } from "../middlewares/auth.middelware.js";
import { verifyIsUserAdmin } from "../middlewares/verifyIsUserAdmin.js";

const router = Router()

router
  .route("/create")
  .post(verifyjwt, verifyIsUserAdmin, upload.fields([{name: "attachment", maxCount: 1}]), createProject)

router
  .route("/get-all")
  .get(verifyjwt, getAllProject)

router
  .route("/get-project/:id")
  .get(verifyjwt, getProject)


export default router;