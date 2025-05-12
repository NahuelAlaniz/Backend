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
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

console.log("MYSQL_URL:", process.env.MYSQL_URL); // Verifica si está correctamente cargada
