import mongoose, { Schema, model } from "mongoose";

const solicitudSchema = new Schema({
    nameSolicitud: {
        type: String,
        require: true,
        minlenght: 10,
    },
    descripcion: {
        type: String,
        require: true,
        maxlenght: 100,
    },
    estado: {
        type: String,
        enum: [
            "pendiente", 
            "completada", 
            "eliminada", 
            "revision", 
            "en progreso", 
            "aceptada",
            "pendiente de inicio"
            ],
        default: "pendiente",
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    trabajadorQueAcepta: {
        type: String,
        ref: "trabajador",
    },
    fotos: [{
        type: String 
    }],
    fechaCreada: {
        type: Date,
        default: Date.now
    },
    fechaAceptada: {
        type: Date,
        default: null
    }
})

export default model ("solicitud", solicitudSchema)