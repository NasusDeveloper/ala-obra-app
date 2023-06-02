import mongoose from 'mongoose';

const trabajadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  documentoPath: {
    type: String
  }
});

const Trabajador = mongoose.model('Trabajador', trabajadorSchema);

export default Trabajador
