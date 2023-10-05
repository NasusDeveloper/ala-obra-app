import { Router } from "express"
import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"

const router = Router()

router.post("/signup", verifySignup.checkRolesExisted , authCtrl.signup)
router.post("/signin", verifySignup.checkRolesExisted, authCtrl.signin)
router.post("/signupTrabajador", verifySignup.checkRolesExisted, authCtrl.signupTrabajador)
router.post("/signinTrabajador", verifySignup.checkRolesExisted, authCtrl.signinTrabajador)
router.post("/crearSolicitud", authCtrl.crearSolicitud)

export default router