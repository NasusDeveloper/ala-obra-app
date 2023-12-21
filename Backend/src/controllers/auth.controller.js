import config from "../config.js"
import Role from "../models/roles.js"
import users from "../models/users.js"
import trabajador from "../models/trabajador.js"
import solicitud from "../models/solicitud.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import multer from "multer"

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

    //Configura el trasportador SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'alaobra3@gmail.com',
            pass: 'naqb jdyf yafk najt'
        }
    })

    //Crear el mensaje de correo electronico
    const mailOptions = {
        from: 'alaobra3@gmail.com',
        to: email,
        subject: 'Confirmación de registro',
        text: 'Por favor, haga click en el siguiente enlace para confirmar su registro: http://192.168.100.171:8000/api/auth/confirmar/' + email
    }

    //Envia el correo electronico 
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log("Correo electrónico enviado: " + info.response)
        }
    })
        
}

export const signupTrabajador = async (req, res) => {
    try {
        const { trabajadorname, rut, email, password, direcction, roles, pdf } = req.body;

        const newTrabajador = new trabajador({
        trabajadorname,
        rut,
        email,
        password: await trabajador.encryptPassword(password), // encripta la password
        direcction,
        roles,
        });

      // Verifica si se ha subido un archivo PDF
        if (req.file) {
        const pdfData = req.file.buffer;
        newTrabajador.pdf = {
            data: pdfData,
            contentType: "application/pdf",
        };
        }

        if (roles) {
        // busca el rol que envía el trabajador y lo devuelve en un arreglo de id
        const foundRoles = await Role.find({ name: { $in: roles } });
        newTrabajador.roles = foundRoles.map((role) => role._id);
        } else {
        // si el usuario no ingresa un rol, por defecto se le asigna el rol Cliente
        const role = await Role.findOne({ name: "trabajador" });
        newTrabajador.roles = [role._id];
        }

        const savedTrabajador = await newTrabajador.save();

      // json web token
        const token = jwt.sign({ id: savedTrabajador._id }, config.SECRET, {
        expiresIn: 86400, // 24 horas
        });

        res.status(200).json({ token });

         //Configura el trasportador SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'alaobra3@gmail.com',
                pass: 'naqb jdyf yafk najt'
        }
    })

    //Crear el mensaje de correo electronico
        const mailOptions = {
            from: 'alaobra3@gmail.com',
            to: email,
            subject: 'Confirmación de registro',
            text: 'Por favor, haga click en el siguiente enlace para confirmar su registro: http://192.168.100.171:8000/api/auth/confirmar/' + email
    }

    //Envia el correo electronico 
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error)
            }  else {
                console.log("Correo electrónico enviado: " + info.response)
        }
    })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar el trabajador" });
    }
};

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
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, "../uploads")
            },
            filename: function(req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname)
            }
        })
        const upload = multer({storage: storage})
        const { nameSolicitud, descripcion, estado, fechaCreada, fechaAceptada } = req.body;
        const fotos = Array.isArray(req.files) ? req.files.map(file => file.path) : [] 

        // Crear una nueva instancia de Solicitud
        // const clienteId = req.users.id
        const nuevaSolicitud = new solicitud({
            nameSolicitud,
            descripcion,
            estado,
            fotos,
            fechaCreada,
            fechaAceptada,
            // cliente: req.users.id,
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
    const {trabajadorRUT} = req.body

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
        solicitudFound.trabajadorQueAcepta = trabajadorRUT;
        solicitudFound.estado = "aceptada"
        solicitudFound.fechaAceptada = new Date()

        const solicitudAceptada = await solicitudFound.save()
        res.status(201).json(solicitudAceptada)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error en el servidor"})
    }
}

export const solicitudesAceptadasTrabajador = async (req, res) => {
    
    const {trabajadorRUT} = req.params

    try {
        // Busca todas las solicitudes donde el trabajador es el que acepta
        const solicitudesAceptadas = await solicitud.find({ trabajadorQueAcepta: trabajadorRUT });

        res.status(201).json(solicitudesAceptadas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const obtenerSolicitudesCliente = async (req, res) => {
    const clienteId = req.query.cliente;
    try {
        const solicitudes = await solicitud.find({ cliente: clienteId, estado: { $in: ['pendiente', 'aceptada', 'pendiente de inicio', 'en progreso', 'completada'] }});
        res.json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes del cliente:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes del cliente' });
    }
};


export const posponerSolicitud = async (req, res) => {
    const { solicitudId } = req.params;
    const { estado } = req.body;

    try {
      // Verifica si la solicitud existe
        const solicitudEncontrada = await solicitud.findById(solicitudId);
        if (!solicitudEncontrada) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

      // Cambia el estado de la solicitud a 'pendiente de inicio'
        solicitudEncontrada.estado = estado;
        const solicitudActualizada = await solicitudEncontrada.save();

        res.status(200).json({ message: 'Solicitud pospuesta correctamente', solicitud: solicitudActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const solicitudesPendientesTrabajo = async (req, res) => {

    try {
        const solicitudesPendientesTrabj = await solicitud.find({estado: "pendiente de inicio"})
        res.json(solicitudesPendientesTrabj)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error al obtener las solicitudes pendientes de el trabajador"})
    }
}

export const iniciarTrabajo = async (req, res) => {
    try {
        const { solicitudId } = req.params; // Obtén el ID de la solicitud de los parámetros de la URL
        const updatedSolicitud = await solicitud.findByIdAndUpdate(
            solicitudId,
            { estado: 'en progreso' },
            { new: true }
        );

        if (!updatedSolicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        res.status(200).json(updatedSolicitud);
    } catch (error) {
        console.error('Error al iniciar el trabajo:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const obtenerSolicitudesEnProgreso = async (req, res) => {
    try {
      // Lógica para obtener las solicitudes con estado "en progreso" desde tu base de datos
      // Suponiendo que tienes un modelo de solicitud y utilizas Mongoose
        const solicitudesEnProgreso = await solicitud.find({ estado: 'en progreso' });

        res.status(200).json(solicitudesEnProgreso);
    } catch (error) {
        console.error('Error al obtener las solicitudes en progreso:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes en progreso' });
    }
};

export const mostrarTrabajador = async (req, res) => {
    try {
        const Trabajador = await trabajador.findOne({email: req.body.email});
        if (!Trabajador) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        res.status(200).json(Trabajador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el trabajador' });
    }
}

export const actualizarDirecction = async (req, res) => {
    try {
      const clienteId = req.params.id; // ID del cliente desde la URL
      const { direccion } = req.body; // Nueva dirección desde el cuerpo de la solicitud

      // Encuentra el cliente por su ID y actualiza la dirección
        const cliente = await cliente.findByIdAndUpdate(clienteId, { direcction: direccion }, { new: true });

      res.status(200).json(cliente); // Devuelve el cliente actualizado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  // Actualizar contraseña del cliente
export const actualizarPassword = async (req, res) => {
    try {
      const clienteId = req.params.id; // ID del cliente desde la URL
      const { password } = req.body; // Nueva contraseña desde el cuerpo de la solicitud

      // Encuentra el cliente por su ID y actualiza la contraseña
        const cliente = await cliente.findByIdAndUpdate(clienteId, { password: contrasena }, { new: true });

      res.status(200).json(cliente); // Devuelve el cliente actualizado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const mostrarDatosUsuario = async (req, res) => {
  const clienteId = req.params.clienteId; // Obtener el ID del cliente desde los parámetros de la ruta

    try {
    // Consultar en la base de datos para obtener los datos del cliente
    const cliente = await cliente.findById(clienteId);

    if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Si se encuentra el cliente, enviar los datos al cliente como respuesta
    res.status(200).json({ cliente });
    } catch (error) {
    // Manejo de errores si ocurre algún problema durante la consulta
    console.error('Error al obtener el perfil del cliente:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    }
};

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