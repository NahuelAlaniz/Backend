"use strict";
/*

//Funciona el codigo
import dotenv from 'dotenv'
import Server from "./models/server";

dotenv.config();
const server = new Server();


*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("MYSQL_URL:", process.env.MYSQL_URL);
