import multer from 'multer'
import path, { dirname } from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads')); // Carpeta donde se almacenarán las imágenes cargadas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo único
  },
});

const upload = multer({ storage: storage });

export default upload