import express from 'express'

import loginControl from '../controllers/loginController.js'

const router = express.Router()

// POST /api/login - Iniciar sesión
router.route('/').post(loginControl.login)

// GET /api/login/isLoggedIn - Verificar si está logueado y obtener información del usuario
router.route('/isLoggedIn').get(loginControl.isLoggedIn)

// POST /api/login/logout - Cerrar sesión
router.route('/logout').post(loginControl.logout)

// Ruta protegida para verificar middleware (opcional)
router.route('/protected').get(loginControl.verifyAuth, (req, res) => {
    res.json({
        message: 'Acceso autorizado',
        user: req.user
    })
})

export default router