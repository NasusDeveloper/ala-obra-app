import {Router} from "express"
import * as trabajadorCtrl from "../controllers/trabajador.controller.js"

const router = Router()

router.post("/", trabajadorCtrl.createTrabajador)

export default router