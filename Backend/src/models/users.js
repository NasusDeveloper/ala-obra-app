import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

//Crea los campos de los usuarios
const userSchema = new Schema({
    username: {
        type: String,
        unique: true
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
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model("users", userSchema)