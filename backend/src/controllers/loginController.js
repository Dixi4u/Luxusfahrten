import userModel from '../models/User.js'
import providerModel from '../models/Provider.js'
import moderatorModel from '../models/Moderator.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'

const loginController = {}

loginController.login = async (req, res) => {
    const {email, password} = req.body
    try {
        let userFound
        let userType
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = 'admin'
            userFound = {_id: 'admin'}
        }
        else{
            userFound = await moderatorModel.findOne({email})
            userType = 'Moderator'
        }
        if(!userFound){
            userFound = await providerModel.findOne({email})
            userType = 'Provider'
        }
        else{
            userFound = await userModel.findOne({email})
            userType = 'User'
        }
        if(!userFound){
            console.log('User not found')
            return res.status(404).json({message: 'User not found'})
        }
        if(userType !== 'admin'){
            /*const isMatch = password === userFound.password;*/
            const isMatch = await bcryptjs.compare(password, userFound.password) 
            if(!isMatch){
                console.log('Invalid credentials')
                return res.status(401).json({message: 'Invalid credentials'})
            }
        }
        jwt.sign(
            {user: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if(error){
                    console.log('Error signing token', error)
                    return res.status(500).json({message: 'Error signing token'})
                }
                res.cookie('authToken', token)
                res.status(200).json({message: 'Login successful',})
            }
        )
    }
    catch (error) {
        console.error('Error logging in', error)
        res.status(500).json({message: 'Error logging in'})
        }
}