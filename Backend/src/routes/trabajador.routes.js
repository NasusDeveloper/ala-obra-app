import {Router} from 'express';
import * as trabajadorctrl from "../controllers/trabajador.controller"

const router = Router()

// Ruta para el registro de un trabajador
router.post('/', trabajadorctrl.createTrabajador);

export default router;
