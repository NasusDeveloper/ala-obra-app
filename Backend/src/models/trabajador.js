import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

//Crear los campos de los trabajadores
const trabajadorSchema = new Schema({
    trabajadorname: {
        type: String,
        unique: true,
        required: true,
    },
    rut: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    direcction: {
        type: String
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
    
}, {
    timestamps: true,
    versionKey: false
}) 

//Encriptar la password y compararla
trabajadorSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
trabajadorSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model ("trabajador", trabajadorSchema)