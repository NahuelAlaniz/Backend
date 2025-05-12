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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStock = void 0;
const product_1 = require("../models/product"); // Ajusta la ruta si es distinta
const sequelize_1 = require("sequelize");
const updateStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productos } = req.body;
    try {
        for (const producto of productos) {
            const { id, cantidad } = producto;
            yield product_1.Product.update({ stock: sequelize_1.Sequelize.literal(`stock - ${cantidad}`) }, { where: { id } });
        }
        res.status(200).send('Stock actualizado correctamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el stock');
    }
});
exports.updateStock = updateStock;
