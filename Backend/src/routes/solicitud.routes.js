import {Router} from "express"
import * as solicitudCtrl from "../controllers/solicitud.controller.js"

const router = Router()

router.post("/", solicitudCtrl.createSolicitud)

export default router