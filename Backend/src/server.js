import "./db/database.js"

import express from "express"
import morgan from "morgan"
import cors from "cors"

import { createRoles } from "./libs/initialSetup.js";
import authRoutes from "./routes/auth.routes.js"
import usersRoutes from "./routes/users.routes.js"

const app = express()
createRoles()


// Configuración de CORS
const corsOption = {
    origin: "http://localhost:8080",
    methods: "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
    allowedHeaders: "Content-Type, Authorization" // Encabezados permitidos  z
  }

app.use(cors(corsOption)) //Habilitar CORS

app.use(express.json());

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.json("Welcome")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

export default app

app.listen(8000)
console.log("Server listen on port", 8000)