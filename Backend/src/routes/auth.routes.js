import { Router } from "express"
import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"
import upload from "../middlewares/multer.js"
import * as solicitudCtrl from "../controllers/solicitud.controller.js"

const router = Router()

router.post("/signup", verifySignup.checkRolesExisted , authCtrl.signup)
router.post("/signin", verifySignup.checkRolesExisted, authCtrl.signin)
router.post("/crearSolicitud", upload.array("fotos", 5), solicitudCtrl.crearSolicitud)
router.post("/signupTrabajador", verifySignup.checkRolesExisted, authCtrl.signupTrabajador)
router.post("/signinTrabajador", verifySignup.checkRolesExisted, authCtrl.signinTrabajador)

export default router