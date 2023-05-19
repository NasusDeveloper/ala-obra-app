import config from "../config.js"
import Role from "../models/roles.js";
import users from "../models/users.js"

import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const {username, rut, email, password, direcction, roles} = req.body 

    const newUser = new users({
        username,
        rut,
        email,
        password: await users.encryptPassword(password), //encripta la password
        direcction,
        roles
    })
    
    if (roles) {
        //busca el rol que envia el usuario y lo devuelve en un arreglo de id
        const foundRoles = await Role.find({name: {$in: roles}}) 
        newUser.roles = foundRoles.map(role => role._id) 
    }
    else{
        //si el usuario no ingresa un roll, por defecto se le asigna el rol Cliente
        const role = await Role.findOne({name: "cliente"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    //json web token
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })

    res.status(200).json({token})
}
export const signin = async (req, res) => {
    //Verificar el usuario
    try {
        const userFound = await users.findOne({email: req.body.email}).populate("roles")

        if(!userFound) throw new Error("Usuario no encontrado")

        const matchPassword = await users.comparePassword(req.body.password, userFound.password)

        if(!matchPassword) throw new Error("Password invalida")

        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 86400
        })
        res.json({token})
    } catch (error) {
        console.log(error)
        res.json({mesage: error})
    }
    
}