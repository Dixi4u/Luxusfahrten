import userModel from '../models/User.js'
import providerModel from '../models/Provider.js'
import moderatorModel from '../models/Moderator.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'

const loginController = {}

loginController.login = async (req, res) => {
    const { email, password } = req.body
    try {
        let userFound = null
        let userType = null

        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = 'admin'
            userFound = { _id: 'admin' }
        } else {
            userFound = await moderatorModel.findOne({ email })
            if (userFound) userType = 'Moderator'

            if (!userFound) {
                userFound = await providerModel.findOne({ email })
                if (userFound) userType = 'Provider'
            }

            if (!userFound) {
                userFound = await userModel.findOne({ email })
                if (userFound) userType = 'User'
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (userType !== 'admin') {
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }
        }

        jwt.sign(
            { user: userFound._id, userType },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) {
                    return res.status(500).json({ message: 'Error signing token' })
                }

                res.cookie('authToken', token)
                res.status(200).json({ message: 'Login successful' })
            }
        )
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' })
    }
}

// Controlador para verificar si el usuario está logueado usando la cookie
loginController.isLoggedIn = (req, res) => {
    const token = req.cookies.authToken
    if (!token) {
        return res.status(401).json({ loggedIn: false, message: 'No token provided' })
    }
    jwt.verify(token, config.JWT.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ loggedIn: false, message: 'Invalid or expired token' })
        }
        res.status(200).json({ loggedIn: true, user: decoded.user, userType: decoded.userType })
    })
}

export default loginController