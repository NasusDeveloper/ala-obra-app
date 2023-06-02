import {ROLES} from "../models/roles.js"
import trabajadores from "../models/trabajador.js"

export const chekDuplicateNameOrEmail = async (req, res, next) => {

    try {
        const trabajador = await trabajadores.finOne({name: req.body.name})

        if (trabajador) throw new Error("El trabajador ya existe")

        const email = await trabajadores.finOne({email: req.body.email})

        if (email) throw new Error("El email ya existe")

        next()
    } catch (error) {
        console.log(error)
        res.json({mensage: error})
    }

    

}

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i= 0; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`
                })
            }
        }
    }

    next()  

}