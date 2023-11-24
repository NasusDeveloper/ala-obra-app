import {Router} from "express"
import * as soporteCtrl from "../controllers/soporte.controller"

const router = Router()

router.post("/", soporteCtrl.createSolicitudSoporte)
router.get("/", soporteCtrl.getSolicitudSoporte)

export default router