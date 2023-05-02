import Role from "../models/roles.js"

//crear roles apenas carga la aplicacion
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()

    if (count > 0) return
    
    //ejecutar todas las funciones al mismo tiempo
    const values = await Promise.all([
        new Role({ name: "trabajador" }).save(),
        new Role({ name: "cliente" }).save(),
    ])

    console.log(values)
    } catch (error) {
        console.error(error) 
    }
}