import userModel from '../models/User.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import {config} from '../config.js'

const loginControl = {}

loginControl.Login = async (req, res) => {
    const { email, password } = req.body
    try{
        let userFound
        let userType
        if(email === config.emailAdmin.email && password === config.emailAdmin.password) {userType = 'admin', userFound = {_id: 'admin'}}

        else{userFound = await userModel.findOne({email}), userType = 'provider'}

        if(!userFound){userFound = await userModel.findOne({email}), userType = 'user' }

        if(!userFound){console.log("No se ha podido encontrar al usuario"); return res.status(400).json({message: "No se ha podido encontrar al usuario"}) }

        if(userType !== 'admin') { const isMatch = await bcryptjs.compare(password, userFound.password); if(!isMatch){ console.log("Contraseña incorrecta"); return res.status(400).json({message: "Contraseña incorrecta"})  } }

        jsonwebtoken.sign({user: userFound._id, userType}, config.JWT.secret, {expiresIn: config.JWT.expiresIn}, (error, token) => {if(error) return res.status(500).json({message: "Error en el login"}), res.cookie("authToken", token), res.json({message: "Inicio de sesion exitoso"}) })
    } catch(error){ return res.status(400).json({message: "El email o la contraseña son incorrectos"}) }
}

export default loginControl