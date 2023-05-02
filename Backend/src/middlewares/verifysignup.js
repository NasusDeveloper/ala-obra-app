import {ROLES} from "../models/roles.js"
import users from "../models/users.js"

export const chekDuplicateUsernameOrEmail = async (req, res, next) => {

    try {
        const user = await users.finOne({username: req.body.username})

        if (user) throw new Error("El usuario ya existe")

        const email = await users.finOne({email: req.body.email})

        if (email) throw new Error("Ya existe")

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