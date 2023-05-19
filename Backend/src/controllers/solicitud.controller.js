import Solicitud from "../models/solicitud.js";
import { validationResult } from "express-validator";

export const createSolicitud = async (req, res) => {

  // Validar los datos del formulario de creación de solicitud
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nameSolicitud, descripcion, fechaInicio, fechaFin } = req.body;
  const fotos = req.files; // Array de fotos subidas

  try {
    // Crear una nueva solicitud
    const solicitud = new Solicitud({
      nameSolicitud,
      descripcion,
      fechaInicio,
      fechaFin,
      fotos: [],
    })

    // Agregar las fotos a la solicitud
    if (fotos && fotos.length > 0) {
      solicitud.fotos = fotos.map((foto) => ({
        filename: foto.filename,
        path: foto.path,
      }))
    }

    // Guardar la solicitud en la base de datos
    await solicitud.save();

    res.status(200).json({ msg: "Solicitud creada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
}

//Actualizar la solicitud
export const updateSolicitud = async (req, res) => {
    const { nombre, descripcion, fechaInicio, fechaFin } = req.body;
    const fotos = req.files; // Array de fotos subidas
  
    try {
      const solicitud = await Solicitud.findById(req.params.id);
  
      if (!solicitud) {
        return res.status(404).json({ msg: "Solicitud no encontrada" });
      }
  
      solicitud.nombre = nombre;
      solicitud.descripcion = descripcion;
      solicitud.fechaInicio = fechaInicio;
      solicitud.fechaFin = fechaFin;
  
      // Actualizar las fotos de la solicitud si se han subido nuevas
      if (fotos && fotos.length > 0) {
        solicitud.fotos = fotos.map((foto) => ({
          filename: foto.filename,
          path: foto.path,
        }));
      }
  
      await solicitud.save();
  
      res.status(200).json({ msg: "Solicitud actualizada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };

  //Eliminar solicitud
  export const deleteSolicitud = async (req, res) => {
    try {
      const solicitud = await Solicitud.findByIdAndDelete(req.params.id);
  
      if (!solicitud) {
        return res.status(404).json({ msg: "Solicitud no encontrada" });
      }
  
      res.status(200).json({ msg: "Solicitud eliminada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
  