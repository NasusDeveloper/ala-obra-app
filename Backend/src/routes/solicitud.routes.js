import {Router} from "express"
import * as solicitudCtrl from "../controllers/solicitud.controller.js"

const router = Router()

router.post("/", solicitudCtrl.createSolicitud)
router.get("/", solicitudCtrl.getSolicitudes)
router.put("/", solicitudCtrl.aceptarSolicitud)
router.get("/", solicitudCtrl.solicitudesTrabajador)
router.get("/", solicitudCtrl.solicitudesPendientesTrabajador)
router.put("/", solicitudCtrl.posponerSolicitud)
export default router