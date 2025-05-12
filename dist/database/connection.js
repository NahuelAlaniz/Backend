"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('api_node.js', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
