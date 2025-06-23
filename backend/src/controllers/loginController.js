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
        let userData = null

        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = 'admin'
            userFound = { _id: 'admin' }
            userData = {
                _id: 'admin',
                name: 'Administrador',
                lastName: 'Sistema',
                email: config.emailAdmin.email,
                role: 'admin'
            }
        } else {
            userFound = await moderatorModel.findOne({ email })
            if (userFound) {
                userType = 'Moderator'
                userData = {
                    _id: userFound._id,
                    name: userFound.name,
                    lastName: userFound.lastName,
                    email: userFound.email,
                    telephone: userFound.telephone,
                    address: userFound.address,
                    document: userFound.document,
                    role: 'moderator'
                }
            }

            if (!userFound) {
                userFound = await providerModel.findOne({ email })
                if (userFound) {
                    userType = 'Provider'
                    userData = {
                        _id: userFound._id,
                        name: userFound.name,
                        lastName: userFound.lastName,
                        email: userFound.email,
                        telephone: userFound.telephone,
                        address: userFound.address,
                        document: userFound.document,
                        role: 'provider'
                    }
                }
            }

            if (!userFound) {
                userFound = await userModel.findOne({ email })
                if (userFound) {
                    userType = 'User'
                    userData = {
                        _id: userFound._id,
                        name: userFound.name,
                        lastName: userFound.lastName,
                        email: userFound.email,
                        telephone: userFound.telephone,
                        address: userFound.address,
                        document: userFound.document,
                        role: 'user'
                    }
                }
            }
        }

        if (!userFound) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            })
        }

        if (userType !== 'admin') {
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if (!isMatch) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Credenciales inválidas' 
                })
            }
        }

        jwt.sign(
            { user: userFound._id, userType },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) {
                    return res.status(500).json({ 
                        success: false,
                        message: 'Error generando token' 
                    })
                }

                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000 // 24 horas
                })

                console.log('✅ Login exitoso para:', email, 'Tipo:', userType);

                res.status(200).json({ 
                    success: true,
                    message: 'Login exitoso',
                    user: userData,
                    userType: userType
                })
            }
        )
    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor' 
        })
    }
}

// Controlador mejorado para verificar si el usuario está logueado
loginController.isLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.authToken
        
        if (!token) {
            return res.status(401).json({ 
                loggedIn: false, 
                isLoggedIn: false,
                message: 'No hay token de autenticación' 
            })
        }

        jwt.verify(token, config.JWT.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ 
                    loggedIn: false, 
                    isLoggedIn: false,
                    message: 'Token inválido o expirado' 
                })
            }

            try {
                let userFound = null
                let userData = null

                // Buscar usuario según el tipo
                if (decoded.user === 'admin') {
                    userData = {
                        _id: 'admin',
                        name: 'Administrador',
                        lastName: 'Sistema',
                        email: config.emailAdmin.email,
                        role: 'admin'
                    }
                } else if (decoded.userType === 'Moderator') {
                    userFound = await moderatorModel.findById(decoded.user).select('-password')
                    if (userFound) {
                        userData = {
                            _id: userFound._id,
                            name: userFound.name,
                            lastName: userFound.lastName,
                            email: userFound.email,
                            telephone: userFound.telephone,
                            address: userFound.address,
                            document: userFound.document,
                            role: 'moderator'
                        }
                    }
                } else if (decoded.userType === 'Provider') {
                    userFound = await providerModel.findById(decoded.user).select('-password')
                    if (userFound) {
                        userData = {
                            _id: userFound._id,
                            name: userFound.name,
                            lastName: userFound.lastName,
                            email: userFound.email,
                            telephone: userFound.telephone,
                            address: userFound.address,
                            document: userFound.document,
                            role: 'provider'
                        }
                    }
                } else if (decoded.userType === 'User') {
                    userFound = await userModel.findById(decoded.user).select('-password')
                    if (userFound) {
                        userData = {
                            _id: userFound._id,
                            name: userFound.name,
                            lastName: userFound.lastName,
                            email: userFound.email,
                            telephone: userFound.telephone,
                            address: userFound.address,
                            document: userFound.document,
                            role: 'user'
                        }
                    }
                }

                if (!userData) {
                    // Si el usuario fue eliminado pero el token aún existe
                    res.clearCookie('authToken')
                    return res.status(401).json({ 
                        loggedIn: false, 
                        isLoggedIn: false,
                        message: 'Usuario no encontrado' 
                    })
                }

                res.status(200).json({ 
                    loggedIn: true, 
                    isLoggedIn: true,
                    user: userData, 
                    userType: decoded.userType,
                    message: 'Usuario autenticado'
                })

            } catch (dbError) {
                console.error('❌ Error buscando usuario:', dbError);
                res.status(500).json({ 
                    loggedIn: false, 
                    isLoggedIn: false,
                    message: 'Error interno del servidor' 
                })
            }
        })
    } catch (error) {
        console.error('❌ Error verificando autenticación:', error);
        res.status(500).json({ 
            loggedIn: false, 
            isLoggedIn: false,
            message: 'Error interno del servidor' 
        })
    }
}

// Nuevo método para logout
loginController.logout = async (req, res) => {
    try {
        // Limpiar la cookie de autenticación
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        console.log('✅ Logout exitoso');

        res.status(200).json({
            success: true,
            message: "Logout exitoso"
        })

    } catch (error) {
        console.error('❌ Error en logout:', error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor" 
        })
    }
}

// Middleware para verificar autenticación
loginController.verifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies.authToken

        if (!token) {
            return res.status(401).json({ 
                message: "Acceso denegado. No hay token de autenticación." 
            })
        }

        jwt.verify(token, config.JWT.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ 
                    message: "Token inválido" 
                })
            }

            let userFound = null

            // Buscar usuario según el tipo
            if (decoded.user === 'admin') {
                req.user = {
                    _id: 'admin',
                    name: 'Administrador',
                    lastName: 'Sistema',
                    email: config.emailAdmin.email,
                    role: 'admin'
                }
                return next()
            } else if (decoded.userType === 'Moderator') {
                userFound = await moderatorModel.findById(decoded.user).select('-password')
            } else if (decoded.userType === 'Provider') {
                userFound = await providerModel.findById(decoded.user).select('-password')
            } else if (decoded.userType === 'User') {
                userFound = await userModel.findById(decoded.user).select('-password')
            }

            if (!userFound) {
                res.clearCookie('authToken')
                return res.status(401).json({ 
                    message: "Usuario no encontrado" 
                })
            }

            // Agregar información del usuario a la request
            req.user = {
                _id: userFound._id,
                name: userFound.name,
                lastName: userFound.lastName,
                email: userFound.email,
                telephone: userFound.telephone,
                address: userFound.address,
                document: userFound.document,
                role: decoded.userType.toLowerCase()
            }
            
            next()
        })

    } catch (error) {
        res.clearCookie('authToken')
        res.status(401).json({ 
            message: "Error verificando autenticación" 
        })
    }
}

export default loginController