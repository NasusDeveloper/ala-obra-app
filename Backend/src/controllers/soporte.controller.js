import solicitudSoporte from "../models/solicitudsoporte.js"

export const createSolicitudSoporte = async (req, res) => {
    try {
    const { name, email, subject, message } = req.body;
    const newSolicitudSoporte = await solicitudSoporte.create({
        name,
        email,
        subject,
        message,
    });
        res.status(201).json({ message: 'Solicitud de soporte creada correctamente', newSolicitudSoporte });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la solicitud de soporte' });
    }
};

export const getSolicitudSoporte = async (req, res) => {
    try {
        const SolicitudSoporte = await solicitudSoporte.find().sort({ createdAt: -1 });
        res.status(200).json({ SolicitudSoporte });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las solicitudes de soporte' });
    }
};
