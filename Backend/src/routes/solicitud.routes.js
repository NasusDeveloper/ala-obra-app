import { Router } from 'express';
import * as solicitudController from '../controllers/solicitud.controller.js';
import * as verifySolicitud from "../middlewares/verifySolicitud.js"
import * as verifyRoleSolicitud from "../middlewares/verifyRoleSolicitud.js"

const router = Router()

// Ruta para crear una solicitud
router.post('/solicitudes', verifySolicitud.verifyToken, verifyRoleSolicitud.verifyRoles, solicitudController.createSolicitud);

// Ruta para actualizar una solicitud por su ID
router.put('/solicitudes/:id', verifySolicitud.verifyToken, verifyRoleSolicitud.verifyRoles, solicitudController.updateSolicitud);

// Ruta para eliminar una solicitud por su ID
router.delete('/solicitudes/:id', verifySolicitud.verifyToken, verifyRoleSolicitud.verifyRoles, solicitudController.deleteSolicitud);

export default router;
