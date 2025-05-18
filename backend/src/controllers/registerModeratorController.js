import moderatorModel from '../models/Moderator.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'

const register = {}

register.registerModerator = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body
    try {
        const existingModerator = await moderatorModel.findOne({email})
        if (existingModerator) {
            return res.status(400).json({ message: 'El correo ya está en uso' })
        }
        const passwordHash = await bcryptjs.hash(password, 10)
        const newModerator = new moderatorModel({ name, lastName, birthday, email, password: passwordHash, telephone, dui, isVerified })
        await newModerator.save()

        jwt.sign(
            {id: newModerator._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if (error) {
                    return res.status(500).json({ message: 'Error al generar el token' })
                }
                res.cookie('authToken', token )
                res.status(201).json({message: 'Moderador registrado con éxito'})
            }
        )

    } catch (error) {
        console.error('Error al registrar moderador', error)
        res.status(500).json({ message: 'Error al registrar moderador' })
    }
}

export default register