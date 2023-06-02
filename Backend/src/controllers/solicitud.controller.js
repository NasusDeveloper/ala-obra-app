import Solicitud from '../models/solicitud.js';
import { validationResult } from 'express-validator';

// Crear una solicitud
export const createSolicitud = async (req, res) => {
  try {
    // Validar los datos del formulario de creación de solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nameSolicitud, descripcion, fechaInicio, fechaFin } = req.body;

    // Crear una nueva solicitud
    const solicitud = new Solicitud({
      nameSolicitud,
      descripcion,
      fechaInicio,
      fechaFin,
      fotos: [],
    });

    // Guardar la solicitud en la base de datos
    await solicitud.save();

    res.status(200).json({ msg: 'Solicitud creada exitosamente', solicitud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// Actualizar una solicitud
export const updateSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameSolicitud, descripcion, fechaInicio, fechaFin } = req.body;

    // Buscar la solicitud por su ID
    const solicitud = await Solicitud.findById(id);

    if (!solicitud) {
      return res.status(404).json({ msg: 'Solicitud no encontrada' });
    }

    // Actualizar los campos de la solicitud
    solicitud.nameSolicitud = nameSolicitud;
    solicitud.descripcion = descripcion;
    solicitud.fechaInicio = fechaInicio;
    solicitud.fechaFin = fechaFin;

    // Guardar los cambios en la base de datos
    await solicitud.save();

    res.status(200).json({ msg: 'Solicitud actualizada exitosamente', solicitud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// Eliminar una solicitud
export const deleteSolicitud = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la solicitud por su ID y eliminarla
    const solicitud = await Solicitud.findByIdAndDelete(id);

    if (!solicitud) {
      return res.status(404).json({ msg: 'Solicitud no encontrada' });
    }

    res.status(200).json({ msg: 'Solicitud eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
