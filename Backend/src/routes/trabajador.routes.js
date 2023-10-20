import {Router} from "express"
import * as trabajadorCtrl from "../controllers/trabajador.controller.js"

const router = Router()

router.post("/", trabajadorCtrl.createTrabajador)
router.get("/", trabajadorCtrl.getTrabajador)
router.put("/", trabajadorCtrl.putPassword)

export default router