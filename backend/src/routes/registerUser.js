import express from 'express'
import register from '../controllers/registerUsersController.js'

const router = express.Router()

router.post('/', register.registerUser)
router.post('/verify', register.verificationCode)

export default router