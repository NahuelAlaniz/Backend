"use strict";
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
const user_1 = __importDefault(require("../routes/user"));
const product_1 = __importDefault(require("../routes/product"));
const user_2 = require("./user");
const product_2 = require("./product");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3017';
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
        this.app.use(user_1.default);
        this.app.use(product_1.default);
        this.app.use('/api/product', product_1.default); // 👈 Ruta para updateStock
    }
    midlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_2.User.sync({});
                yield product_2.Product.sync({});
                console.log('Tablas sincronizadas correctamente');
            }
            catch (error) {
                console.log("Error de conexión a la base de datos:", error);
            }
        });
    }
}
exports.default = Server;
