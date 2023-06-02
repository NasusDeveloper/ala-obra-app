import {Router} from 'express';
import * as trabajadorCtrl from "../controllers/trabajador.controller.js"

const router = Router()

// Ruta para el registro de un trabajador
router.post('/', trabajadorCtrl.createTrabajador);

export default router;
