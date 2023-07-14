import { Router } from "express"
const router = Router()

import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"
import * as verifySolicitud from "../middlewares/verifySolicitud.js"

router.post("/signup", verifySignup.checkRolesExisted , authCtrl.signup)
router.post("/signin", authCtrl.signin)
router.post("/createSolicitud", verifySolicitud.verifySolicitud, authCtrl.createSolicitud)
export default router