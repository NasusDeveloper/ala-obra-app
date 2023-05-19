import { Schema, model } from "mongoose"

//Crea los campos de los usuarios
const solicitudSchema = new Schema({
    nameSolicitud: {
        type: String,
        require: true,
        minlength: 10
    },
    descripcion: {
        type: String,
        maxlength: 100
    },
    fotos: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 5,
            message: "Se permite un maximo de 5 fotos" 
        }
    },
    fechaInicio: {
        type: Date,
        require: true
    },
    fechaFin: {
        type: Date,
        require: true
    },
    
    
}, {
    timestamps: true
})

export default solicitudSchema ("Solicitud", Schema)