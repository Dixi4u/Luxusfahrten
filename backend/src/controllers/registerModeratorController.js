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
            return res.status(400).json({ message: 'The email is already in use' })
        }
        const passwordHash = await bcryptjs.hash(password, 10)
        const newModerator = new moderatorModel({ name, lastName, birthday, email, password: passwordHash, telephone, dui, isVerified: true })
        await newModerator.save()

        jwt.sign(
            {id: newModerator._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if (error) {
                    return res.status(500).json({ message: 'Error generating the token' })
                }
                res.cookie('authToken', token )
                res.status(201).json({message: 'Moderator registered successfully'})
            }
        )

    } catch (error) {
        console.error('Error registering moderator', error)
        res.status(500).json({ message: 'Error registering moderator' })
    }
}

export default register