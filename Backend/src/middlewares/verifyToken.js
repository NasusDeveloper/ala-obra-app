import jwt from "jsonwebtoken"
import config from "../config.js"

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token, config.SECRET, (error, decoded) => {
        if (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
      req.userId = decoded.id; // Agrega el ID del trabajador al objeto de solicitud para su uso posterior
    next();
    });
};