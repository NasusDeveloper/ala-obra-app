import { Schema, model } from "mongoose";

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
        enum: ["mostrando", "completada", "eliminada", "revision"],
        default: "mostrando",
    },
})

export default model ("solicitud", solicitudSchema)