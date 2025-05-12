import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { User } from "../models/user"
import { Op } from "sequelize"
import jwt from "jsonwebtoken"


export const register = async (req: Request, res: Response) => {

    const { name, lastname, password, email, credential } = req.body

    const user = await User.findOne({ where: { [Op.or]: { email, credential } } })

    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${email} o ${credential}`
        })
    }

    console.log("Estoy por aquí");

    const passwordHash = await bcrypt.hash(password, 10)


    try {

        User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1,
        })

        res.json({
            msg: `User ${name} ${lastname} create sucess...`
        })

    } catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario con ${name} ${lastname}`
        })
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    const user: any = await User.findOne({ where: { email: email } })


    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto => ${password}`
        })
    }

    const token = jwt.sign({
        email: email,
        password: password
    }, process.env.SECRET_KEY || 'TSE-Nahuel-Alaniz', {
        expiresIn: 20000
    });


    res.json({ token })
}