// SupportRequest.js - Modelo
import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const solicitudSoporteSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model ("soporte", solicitudSoporteSchema)