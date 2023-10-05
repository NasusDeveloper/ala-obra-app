import config from "../config.js"
import Role from "../models/roles.js"
import users from "../models/users.js"
import trabajador from "../models/trabajador.js"
import solicitud from "../models/solicitud.js"
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

    
        [email] = email;
        const [subject, setSubject] = "Registrado con éxito";
        const [message, setMessage] = "Hola "+email+", has sido registrado con éxito. Bienvenido a ALaObra";
      
        const baseUrl = "http://localhost:8000";
      
        
}

export const signupTrabajador = async (req, res) => {
    const {trabajadorname, rut, email, password, direcction, roles} = req.body 

    const newTrabajador = new trabajador({
        trabajadorname,
        rut,
        email,
        password: await trabajador.encryptPassword(password), //encripta la password
        direcction,
        roles
    })
    
    if (roles) {
        //busca el rol que envía el trabajador y lo devuelve en un arreglo de id
        const foundRoles = await Role.find({name: {$in: roles}}) 
        newTrabajador.roles = foundRoles.map(role => role._id) 
    }
    else{
        //si el usuario no ingresa un roll, por defecto se le asigna el rol Cliente
        const role = await Role.findOne({name: "trabajador"})
        newTrabajador.roles = [role._id]
    }

    const savedTrabajador = await newTrabajador.save()

    //json web token
    const token = jwt.sign({id: savedTrabajador._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })

    res.status(200).json({token})

        [email] = email;
        const [subject, setSubject] = "Registrado con éxito";
        const [message, setMessage] = "Hola "+email+", has sido registrado con éxito. Bienvenido a ALaObra";
      
        const baseUrl = "http://localhost:8000";
      
        
}

export const signinTrabajador = async (req, res) => {
    //Verificar el trabajador
    try {
        const trabajadorFound = await trabajador.findOne({email: req.body.email}).populate("roles")

        if(!trabajadorFound) throw new Error("Usuario no encontrado")

        const matchPassword = await trabajador.comparePassword(req.body.password, trabajadorFound.password)

        if(!matchPassword) throw new Error("Password invalida")

        const token = jwt.sign({id: trabajadorFound._id}, config.SECRET, {
            expiresIn: 86400
        })
        res.json({token})
    } catch (error) {
        console.log(error)
        res.json({mesage: error})
    }
    
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

// Crear una nueva solicitud
export const crearSolicitud = async (req, res) => {
    try {
        const { nameSolicitud, descripcion, estado } = req.body;

      // Crear una nueva instancia de Solicitud
        const nuevaSolicitud = new solicitud({
        nameSolicitud,
        descripcion,
        estado,
    });

      // Guardar la solicitud en la base de datos
        await nuevaSolicitud.save();

        res.status(201).json({ message: "Solicitud creada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

  // Obtener todas las solicitudes
export const obtenerSolicitudes = async (req, res) => {
    try {
        const solicitudes = await solicitud.find();
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

  // Obtener una solicitud por su ID
export const obtenerSolicitudPorId = async (req, res) => {
    try {
        const solicitud = await solicitud.findById(req.params.id);
        if (!solicitud) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
        res.status(200).json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

  // Actualizar una solicitud por su ID
export const actualizarSolicitud = async (req, res) => {
    try {
        const { nameSolicitud, descripcion, estado } = req.body;
        const solicitudActualizada = await solicitud.findByIdAndUpdate(
        req.params.id,
        { nameSolicitud, descripcion, estado },
        { new: true }
    );
    if (!solicitudActualizada) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
        res.status(200).json({ message: "Solicitud actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

  // Eliminar una solicitud por su ID
export const eliminarSolicitud = async (req, res) => {
    try {
        const solicitudEliminada = await solicitud.findByIdAndRemove(req.params.id);
        if (!solicitudEliminada) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
        res.status(200).json({ message: "Solicitud eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};