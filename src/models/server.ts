
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


import express, { Application } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';

import RUser from '../routes/user';
import RProduct from '../routes/product';

import { User } from './user';
import { Product } from './product';

import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

console.log("MYSQL_URL:", process.env.MYSQL_URL); // Verifica si la variable está bien cargada

class Server {
    private app: Application;
    private port: string;
    private sequelize: Sequelize;

    constructor() {
        this.app = express();
        this.port = process.env['PORT'] || '3017';

        /*
        this.sequelize = new Sequelize(process.env.MYSQL_URL as string);
        */
        this.sequelize = new Sequelize(process.env.MYSQL_URL as string, {
            dialect: 'mysql',
            logging: false,
        });


        // Llamar a los métodos de configuración
        this.midlewares();
        this.router();
        this.DBconnect();  // Conectar a la base de datos
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
        this.app.use(RUser);
        this.app.use(RProduct);
        this.app.use('/api/product', RProduct); // 👈 Ruta para updateStock
    }

    // Middleware de configuración
    midlewares() {
        this.app.use(cors({
            origin: ['http://localhost:3000', 'https://ll-vame-a-par-s-dt76.vercel.app/']  // Agrega tu frontend aquí
        }));
        this.app.use(express.json());
    }

    // Método para conectar con la base de datos
    async DBconnect() {
        try {
            // Probar la conexión con la base de datos
            await this.sequelize.authenticate();
            console.log('Conexión a la base de datos MySQL exitosa.');

            // Sincronizar los modelos (esto asegura que las tablas se creen o actualicen en la base de datos)
            await User.sync();
            await Product.sync();

            console.log('Tablas sincronizadas correctamente');
        } catch (error) {
            console.error('Error de conexión a la base de datos:', error);
        }
    }
}

export default Server;
