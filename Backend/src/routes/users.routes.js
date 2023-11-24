import {Router} from "express"
import * as userCtrl from "../controllers/user.controller.js"

const router = Router()

router.post("/", userCtrl.createUser)
router.get("/", userCtrl.getTrabajador)

export default router