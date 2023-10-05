import { Schema, model } from "mongoose";

export const ROLES = ["trabajador", "cliente"]

//Crea una coleccion para los roles, con su nombre
const roleSchema = new Schema(
    {
        name: String
    },
    {
        versionKey: false
    }
)

export default model("Role", roleSchema)