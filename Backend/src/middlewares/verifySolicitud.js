import jwt from 'jsonwebtoken';
import config from '../config.js';

export const verifySolicitud = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'No se proporcionó un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token inválido' });
  }
};
