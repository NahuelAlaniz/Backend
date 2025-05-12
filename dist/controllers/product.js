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
exports.registerPurchase = exports.getProducts = exports.registerProduct = exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
// Clase Product exportada, que extiende de Model
class Product extends sequelize_1.Model {
}
exports.Product = Product;
// Inicialización de la clase Product
Product.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    size: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    image: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    stock: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    status: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
}, {
    sequelize: connection_1.default,
    modelName: 'Product',
});
// Función para registrar un producto
const registerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, size, category, image, description, price, stock } = req.body;
    yield Product.create({
        name,
        size,
        category,
        image,
        description,
        price,
        stock,
        status: 1,
    });
    res.json({
        msg: `Product ${name} created successfully`,
    });
});
exports.registerProduct = registerProduct;
// Función para obtener los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield Product.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
// Función para registrar una compra
const registerPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    const product = yield Product.findByPk(productId);
    if (!product) {
        res.status(404).json({ msg: "Product not found" });
        return; // Terminamos la ejecución aquí si no se encuentra el producto
    }
    if (product.stock < quantity) {
        res.status(400).json({ msg: "Not enough stock available" });
        return; // Terminamos la ejecución aquí si no hay suficiente stock
    }
    product.stock -= quantity;
    yield product.save();
    res.json({ msg: `Purchase successful, new stock for ${product.name}: ${product.stock}` });
});
exports.registerPurchase = registerPurchase;
