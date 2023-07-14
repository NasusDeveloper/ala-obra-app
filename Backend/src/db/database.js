import {connect} from "mongoose"
import *as dotenv from "dotenv"

//Trae las credenciales de .env
dotenv.config()

//Coneccion de base de datos
connect(`mongodb+srv://${process.env.USER_DB}:${process.env.USER_PWS}@cluster0.z1pomkp.mongodb.net/?retryWrites=true&w=majority`, {
})
 .then(db => console.log("Db is connected"))
 .catch(error => console.log(error))