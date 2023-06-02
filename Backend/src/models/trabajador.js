import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const trabajadorSchema = new Schema({
  nametrabajador: {
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId
}],
  documentoPath: {
    type: String
  }
},
{
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

export default model("trabajador", trabajadorSchema)
