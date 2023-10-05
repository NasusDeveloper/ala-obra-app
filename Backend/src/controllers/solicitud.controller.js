import solicitud from "../models/solicitud.js"

export const crearSolicitud = async (req, res) => {
    try {
        const {nameSolicitud, descripcion, estado} = req.body
        const fotos = req.files.map((file) => ({
            data: file.buffer, //Datos binarios de la imagen
            contentType: file.mimetype, //tipo de contenido de la imagen
        }))

        const nuevaSolicitud = new solicitud ({
            nameSolicitud,
            descripcion,
            estado,
            fotos,
        })

        await nuevaSolicitud.save()

        res.status(201).json({message: "Solicitud creada exitosamente"})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error en el servidor"})
    }
}