import express from 'express'
import login from '../controllers/loginController.js'
import loginControl from '../controllers/loginController.js'

const router = express.Router()

router.route('/').post(loginControl.Login)

export default router