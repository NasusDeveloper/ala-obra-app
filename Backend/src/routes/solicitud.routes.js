import { Router } from 'express';
import { createSolicitud, updateSolicitud, deleteSolicitud } from '../controllers/solicitud.controller.js';
import { verifySolicitud} from '../middlewares/verifySolicitud.js';
import { verifyRoles } from '../middlewares/verifyRoleSolicitud.js';

const router = Router();

// Ruta para crear una solicitud
router.post('/', verifySolicitud, verifyRoles(['Cliente']), createSolicitud);

// Ruta para actualizar una solicitud por su ID
router.put('/:id', verifySolicitud, verifyRoles(['Cliente']), updateSolicitud);

// Ruta para eliminar una solicitud por su ID
router.delete('/:id', verifySolicitud, verifyRoles(['Cliente']), deleteSolicitud);

export default router;
