import mongoose from "mongoose"

const solicitudSchema = new mongoose.Schema({
    nameSolicitud: {
        type: String,
        required: true,
        minlength: 10,
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 100,
    },
    fotos: [
        {
            data: Buffer, //Datos binarios de la imagen
            contentType: String, //Tipo de contenido de la imagen
        },
    ],
    estado: {
        type: String,
        enum: ['monstrando', 'completada', 'eliminada', 'revision'],
        default: 'mostrando', //estado por defecto al crear una solicitud
    },
})

const Solicitud = mongoose.model('Solicitud', solicitudSchema)

export default Solicitud