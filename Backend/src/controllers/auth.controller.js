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

        if(!trabajadorFound) throw new Error("Trabajador no encontrado")

        const matchPassword = await trabajador.comparePassword(req.body.password, trabajadorFound.password)

        if(!matchPassword) throw new Error("Password invalida")

        const token = jwt.sign({id: trabajadorFound._id}, config.SECRET, {
            expiresIn: 86400
        })
        res.json({token, userType: "trabajador"})
    } catch (error) {
        console.log(error)
        res.json({message: error})
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
        res.json({token, userType: "cliente"})
    } catch (error) {
        console.log(error)
        res.json({message: error})
    }
    
}

// Crear una nueva solicitud
export const crearSolicitud = async (req, res) => {
    try {
        const { nameSolicitud, descripcion, estado } = req.body;

      // Crear una nueva instancia de Solicitud
        // const clienteId = req.users.id
        const nuevaSolicitud = new solicitud({
            nameSolicitud,
            descripcion,
            estado,
            // cliente: clienteId,
    });

      // Guardar la solicitud en la base de datos
        const solicitudGuardada = await nuevaSolicitud.save();

        res.status(201).json(solicitudGuardada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const aceptarSolicitudes = async (req, res) => {
    const {solicitudId} = req.params
    const {trabajadorId} = req.body

    try {
        //Primero verificar si la solicitud existe
        const solicitudFound = await solicitud.findById(solicitudId)
        if (!solicitudFound) {
            return res.status(404).json({error: "Solicitud no encontrada"})
        }

        //Verificar si la solicitud ya ha sido aceptada
        if (solicitudFound.estado === "aceptada") {
            return res.status(400).json({error: "La solicitud ya ha sido aceptada"})
        }

        //Actualiza la solicitud con el trabajador que la acepta y cambia el estado
        solicitudFound.trabajadorQueAcepta = trabajadorId;
        solicitudFound.estado = "aceptada"

        await solicitud.save()
        res.json({message: "Solicitud aceptada exitosamente"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error en el servidor"})
    }
}

export const solicitudesAceptadasTrabajador = async (req, res) => {
    
    const {trabajadorId} = req.params

    try {
        // Busca todas las solicitudes donde el trabajador es el que acepta
        const solicitudesAceptadas = await solicitud.find({ trabajadorQueAcepta: trabajadorId });

        res.json(solicitudesAceptadas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const solicitudesPendientesTrabajo = async (req, res) => {

    try {
        const solicitudesPendientesTrabj = await solicitud.find({estado: "pendiente de inicio"})
        res.json(solicitudesPendientesTrabj)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error al obtener las solicitudes pendientes de el trabajador"})
    }
}

export const getDatosTrabajador = async (req, res) => {
    try {
      // El middleware verifyToken habrá agregado una propiedad `trabajador` al objeto `req`.
      // Puedes acceder a los datos del trabajador actual a través de `req.trabajador`.

    if (!req.trabajador) {
        return res.status(401).json({ error: "No se proporcionó el token o el token es inválido." });
    }

      // Obtén los datos del trabajador autenticado
    const trabajadorAutenticado = req.trabajador;

      // Ahora puedes acceder a los datos del trabajador:
    const trabajadorname = trabajadorAutenticado.trabajadorname;
    const email = trabajadorAutenticado.email;
    const direcction = trabajadorAutenticado.direcction;
    const roles = trabajadorAutenticado.roles; // Puedes mapear los roles si es necesario

      // Respondes con los datos del trabajador
    res.status(200).json({
        trabajadorname,
        email,
        direcction,
        roles,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const {trabajadorname} = req.params
        const {newPassword} = req.body

        const trabajadorData = await trabajador.findOne({trabajadorname})
        if(!trabajadorData){
            return res.status(400).json({error: "Trabajador no encontrado"})
        }

        trabajador.password = newPassword
        await trabajador.save()

        res.json({message: "Paswword actualizada con exito"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error al actualizar la password"})
    }
}

// export const crearSolicitud = async (req, res) => {
//     try {
//         const { nameSolicitud, descripcion, estado } = req.body;

//         // Obtén el ID del cliente actual desde el token o donde lo almacenes en tu aplicación
//         const clienteId = req.users.id; // Esto depende de cómo manejes la autenticación del usuario

//         // Busca al cliente en la base de datos
//         const cliente = await users.findById(clienteId);

//         if (!cliente) {
//             return res.status(404).json({ error: "Cliente no encontrado" });
//         }

//         // Crea una nueva instancia de Solicitud y enlázala al cliente
//         const nuevaSolicitud = new solicitud({
//             nameSolicitud,
//             descripcion,
//             estado,
//             cliente: cliente._id, // Asocia la solicitud con el cliente
//         });

//         // Guarda la solicitud en la base de datos
//         await nuevaSolicitud.save();

//         res.status(201).json({ message: "Solicitud creada exitosamente" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error en el servidor" });
//     }
// };


export const obtenerSolicitudes = async (req, res) => {
    try {
        const solicitudesMostrando = await solicitud.find({estado: "pendiente"}).populate("cliente")
        res.status(200).json(solicitudesMostrando)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error en el servidor"})
    }
}

  // Obtener una solicitud por su ID
export const obtenerSolicitudPorId = async (req, res) => {
    try {
        const Solicitud = await solicitud.findById(req.params.id, {estado: "pendiente"});
        if (!Solicitud) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
        res.status(200).json(Solicitud);
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