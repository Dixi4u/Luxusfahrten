import express from 'express'
import logout from '../controllers/logoutController.js'
import router from './login.js'

const router  = express.Router()

router.route('/').post(logout.logout)

export default router