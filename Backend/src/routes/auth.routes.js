import { Router } from "express"
import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"
import * as verifyToken from "../middlewares/verifyToken.js"
import * as soporteCtrl from "../controllers/soporte.controller.js"
import * as confirmarCtrl from "../controllers/confirmacion.controller.js"
import multer from "multer"

const router = Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", verifySignup.checkRolesExisted , authCtrl.signup)
router.post("/signin", verifySignup.checkRolesExisted, authCtrl.signin)
router.post("/signupTrabajador", verifySignup.checkRolesExisted, upload.single("pdf") ,authCtrl.signupTrabajador)
router.post("/signinTrabajador", verifySignup.checkRolesExisted, authCtrl.signinTrabajador)
router.post("/crearSolicitud", upload.single("fotos", 5), authCtrl.crearSolicitud)
router.get("/solicitudesMostrando", authCtrl.obtenerSolicitudes)
router.put("/aceptar/:solicitudId", authCtrl.aceptarSolicitudes)
router.get("/solicitudes/:trabajadorRUT", authCtrl.solicitudesAceptadasTrabajador)
router.get("/solicitudesPentiendesTrabajador", authCtrl.solicitudesPendientesTrabajo)
router.get("/trabajadorMostrar", authCtrl.mostrarTrabajador)
router.put("trabajadorActualizar")
router.put("/cliente", verifyToken.verifyToken, authCtrl.mostrarDatosUsuario)
router.post("/crearSolicitudSoporte", soporteCtrl.createSolicitudSoporte)
router.get("/SolicitudSoporte", soporteCtrl.getSolicitudSoporte)
router.get("/confirmar/:email", confirmarCtrl.confirmarCorreo)
router.put("/posponer/:solicitudId", authCtrl.posponerSolicitud)
router.get('/solicitudes/cliente/:clienteId', authCtrl.obtenerSolicitudesCliente)
router.put('/iniciarTrabajo/:solicitudId', authCtrl.iniciarTrabajo)
router.get('/solicitudesEnProgreso', authCtrl.obtenerSolicitudesEnProgreso)
router.put('/cliente/:id/direcction', authCtrl.actualizarDirecction);
router.put('/cliente/:id/password', authCtrl.actualizarPassword);


export default router