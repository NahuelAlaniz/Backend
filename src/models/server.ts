

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

        //Se le modifico los corchetes
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


import express, { Application } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize'; // Asegúrate de importar Sequelize

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
    private sequelize: Sequelize;  // Nueva propiedad para la conexión Sequelize

    constructor() {
        this.app = express();
        this.port = process.env['PORT'] || '3017';

        // Inicializar Sequelize para la conexión a la base de datos
        this.sequelize = new Sequelize(
            process.env.DB_NAME as string,
            process.env.DB_USER as string,
            process.env.DB_PASSWORD as string,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
                port: parseInt(process.env.DB_PORT || '3306'),
            }
        );

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
        this.app.use(cors());
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


import express, { Application } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize'; // Asegúrate de importar Sequelize

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
    private sequelize: Sequelize;  // Nueva propiedad para la conexión Sequelize

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3017';

        // Verificar si la variable MYSQL_URL está presente en el archivo .env
        const mysqlUrl = process.env.MYSQL_URL;
        if (!mysqlUrl) {
            console.error('Error: MYSQL_URL no está definida en las variables de entorno.');
            process.exit(1); // Detener la ejecución si no se encuentra la URL de la base de datos
        }

        // Inicializar Sequelize con la URL completa de la base de datos
        this.sequelize = new Sequelize(mysqlUrl, {
            dialect: 'mysql',
            protocol: 'mysql',
            logging: false,  // Activa el logging si lo necesitas
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
        this.app.use(cors());
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


import express, { Application } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize'; // Asegúrate de importar Sequelize

import RUser from '../routes/user';
import RProduct from '../routes/product';

import { User } from './user';
import { Product } from './product';

import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("MYSQL_URL:", process.env.MYSQL_URL);


class Server {
    private app: Application;
    private port: string;
    private sequelize: Sequelize;  // Nueva propiedad para la conexión Sequelize

    constructor() {
        this.app = express();
        this.port = process.env['PORT'] || '3017';

        // Inicializar Sequelize para la conexión a la base de datos
        this.sequelize = new Sequelize(
            process.env.DB_NAME as string,
            process.env.DB_USER as string,
            process.env.DB_PASSWORD as string,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
                port: parseInt(process.env.DB_PORT || '3306'),
            }
        );

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
        this.app.use(cors());
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

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("MYSQL_URL:", process.env.MYSQL_URL);

class Server {
    private app: Application;
    private port: string;
    private sequelize: Sequelize;

    constructor() {
        this.app = express();
        this.port = process.env['PORT'] || '3017';

        // Inicializar Sequelize para la conexión a la base de datos usando MYSQL_URL
        this.sequelize = new Sequelize(
            process.env.DB_NAME as string,
            process.env.DB_USER as string,
            process.env.DB_PASSWORD as string,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
                port: parseInt(process.env.DB_PORT || '3306'),
            }
        );


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
        this.app.use(cors());
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
