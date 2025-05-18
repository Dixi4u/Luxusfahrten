import express from 'express'
import register from '../controllers/registerUsersController.js'

const router = express.Router()

router.post('/user', register.registerUser)
router.post('/provider', register.registerProvider)
router.post('/verify', register.verificationCode)

export default router