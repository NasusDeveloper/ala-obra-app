export const createSolicitud = (req, res) => {
    res.json("creating solicitud")
}

export const getSolicitudes = (req, res) => {
    res.json("Solicitudes obtenidas")
}

export const aceptarSolicitud = (req, res) => {
    res.json("Solicitudes aceptadas")
}

export const solicitudesTrabajador = (req, res) => {
    res.json("Solicitudes")
}

export const solicitudesPendientesTrabajador = (req, res) => {
    res.json("Solicitudes pendientes")
}

export const posponerSolicitud = (req, res) => {
    res.json("Se pospuso la solicitud")
}