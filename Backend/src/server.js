import "./db/database.js"
import express from "express"
import morgan from "morgan"
import cors from "cors";

import { createRoles } from "./libs/initialSetup.js";

import authRoutes from "./routes/auth.routes.js"
import usersRoutes from "./routes/users.routes.js"

const app = express()
createRoles()

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.json("Welcome")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

export default app

app.listen(8080)
console.log("Server listen on port", 8080)