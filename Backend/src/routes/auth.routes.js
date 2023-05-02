import { Router } from "express"
const router = Router()

import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"

router.post("/signup", verifySignup.checkRolesExisted ,authCtrl.signup)
router.post("/signin" ,authCtrl.signin)

export default router