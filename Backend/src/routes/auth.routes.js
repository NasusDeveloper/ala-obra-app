import { Router } from "express"
const router = Router()

import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"
import * as verifyRegistroTrabajador from "../middlewares/verifyregistrotrabajador.js"

router.post("/signup", verifySignup.checkRolesExisted , authCtrl.signup)
router.post("/signin", authCtrl.signin)
router.post("/signupTrabajador", verifyRegistroTrabajador.checkRolesExisted , authCtrl.signupTrabajador)
export default router