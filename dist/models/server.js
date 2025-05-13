"use strict";
/*

import express, { Application } from 'express';
import cors from 'cors';

import RUser from '../routes/user';
import RProduct from '../routes/product';

import { User } from './user';
import { Product } from './product';

import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env['PORT'] || '3017';
        this.midlewares();
        this.router();
        this.DBconnect();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor ejecutándose en el puerto " + this.port);
        });
    }

    router() {
        this.app.use(RUser);
        this.app.use(RProduct);
        this.app.use('/api/product', RProduct); // 👈 Ruta para updateStock
    }

    midlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }


    async DBconnect() {
        try {
            await User.sync({});
            await Product.sync({});

            console.log('Tablas sincronizadas correctamente');
        } catch (error) {
            console.log("Error de conexión a la base de datos:", error);
        }
    }
}




export default Server;
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../routes/user"));
const product_1 = __importDefault(require("../routes/product"));
const user_2 = require("./user");
const product_2 = require("./product");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
console.log("MYSQL_URL:", process.env.MYSQL_URL); // Verifica si la variable está bien cargada
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env['PORT'] || '3017';
        /*
        this.sequelize = new Sequelize(process.env.MYSQL_URL as string);
        */
        this.sequelize = new sequelize_1.Sequelize(process.env.MYSQL_URL, {
            dialect: 'mysql',
            logging: false,
        });
        // Llamar a los métodos de configuración
        this.midlewares();
        this.router();
        this.DBconnect(); // Conectar a la base de datos
        this.listen();
    }
    // Iniciar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor ejecutándose en el puerto " + this.port);
        });
    }
    // Configuración de rutas
    router() {
        this.app.use(user_1.default);
        this.app.use(product_1.default);
        this.app.use('/api/product', product_1.default); // 👈 Ruta para updateStock
    }
    // Middleware de configuración
    midlewares() {
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:3000', 'https://ll-vame-a-par-s-dt76.vercel.app/'] // Agrega tu frontend aquí
        }));
        this.app.use(express_1.default.json());
    }
    // Método para conectar con la base de datos
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Probar la conexión con la base de datos
                yield this.sequelize.authenticate();
                console.log('Conexión a la base de datos MySQL exitosa.');
                // Sincronizar los modelos (esto asegura que las tablas se creen o actualicen en la base de datos)
                yield user_2.User.sync();
                yield product_2.Product.sync();
                console.log('Tablas sincronizadas correctamente');
            }
            catch (error) {
                console.error('Error de conexión a la base de datos:', error);
            }
        });
    }
}
exports.default = Server;
