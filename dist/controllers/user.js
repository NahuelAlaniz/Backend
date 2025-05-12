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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, password, email, credential } = req.body;
    const user = yield user_1.User.findOne({ where: { [sequelize_1.Op.or]: { email, credential } } });
    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${email} o ${credential}`
        });
    }
    console.log("Estoy por aquí");
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    try {
        user_1.User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1,
        });
        res.json({
            msg: `User ${name} ${lastname} create sucess...`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario con ${name} ${lastname}`
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto => ${password}`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        email: email,
        password: password
    }, process.env.SECRET_KEY || 'TSE-Nahuel-Alaniz', {
        expiresIn: 20000
    });
    res.json({ token });
});
exports.login = login;
