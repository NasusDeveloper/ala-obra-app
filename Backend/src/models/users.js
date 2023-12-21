import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

//Crea los campos de los usuarios
const userSchema = new Schema({
    username: {
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
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    direcction: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
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
    
}, {
    timestamps: true,
    versionKey: false
})

//Encriptar la password y compararla
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model("users", userSchema)