import { Router } from "express"
import * as authCtrl from "../controllers/auth.controller.js"
import * as verifySignup from "../middlewares/verifysignup.js"
import * as verifyToken from "../middlewares/verifyToken.js"
import * as soporteCtrl from "../controllers/soporte.controller.js"

const router = Router()

router.post("/signup", verifySignup.checkRolesExisted , authCtrl.signup)
router.post("/signin", verifySignup.checkRolesExisted, authCtrl.signin)
router.post("/signupTrabajador", verifySignup.checkRolesExisted, authCtrl.signupTrabajador)
router.post("/signinTrabajador", verifySignup.checkRolesExisted, authCtrl.signinTrabajador)
router.post("/crearSolicitud", authCtrl.crearSolicitud)
router.get("/solicitudesMostrando", authCtrl.obtenerSolicitudes)
router.put("/aceptar/:solicitudId", authCtrl.aceptarSolicitudes)
router.get("/solicitudes/:trabajadorId", authCtrl.solicitudesAceptadasTrabajador)
router.get("/solicitudesPentiendesTrabajador", authCtrl.solicitudesPendientesTrabajo)
router.get("/trabajadorMostrar", verifyToken.verifyToken, authCtrl.getDatosTrabajador)
router.put("/trabajadorPassword", authCtrl.updatePassword)
router.put("/usuarioMostrar", verifyToken.verifyToken, authCtrl.getDatosUsuario )
router.post("/crearSolicitudSoporte", soporteCtrl.createSolicitudSoporte)
router.get("/SolicitudSoporte", soporteCtrl.getSolicitudSoporte)

export default router