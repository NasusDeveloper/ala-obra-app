import users from "../models/users.js"

export const confirmarCorreo = async (req, res) => {
    const email = req.params.email

    //Actualiza la base de datos del cliente con el campo "confirmado" establecido en verdadero
    users.findOneAndUpdate({email}, {confirmado: true})
        .then((users) => {
            return res.status(200).json("Confirmado con exito")
        })
        .catch((error) => {
            console.log(error)
            return res.status(500).json({error: "Error al confirmar el correo"})
        })
        
}
