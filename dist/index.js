"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
import dotenv from 'dotenv'
import Server from "./models/server";

dotenv.config();
const server = new Server();


import dotenv from 'dotenv';
import Server from './models/server';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia del servidor
const server = new Server();
*/
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
console.log("MYSQL_URL:", process.env.MYSQL_URL); // Verifica si está correctamente cargada
