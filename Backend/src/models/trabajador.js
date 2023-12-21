import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

//Crear los campos de los trabajadores
const trabajadorSchema = new Schema({
    trabajadorname: {
        type: String,
        unique: true,
        require: true,
    },
    rut: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    direcction: {
        type: String
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    paymentMethods: [{
        cardNumber: {
            type: String,
            required: true
        },
        cardType: {
            type: String,
            required: true
        }
    }],
    pdf: {
        data: Buffer,
        contentType: String
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    
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