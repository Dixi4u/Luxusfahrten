import express from 'express'
import register from '../controllers/registerUsersController.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'public/' })

router.post('/user', upload.single('image'), register.registerUser)
router.post('/provider', upload.single('image'), register.registerProvider)
router.post('/verify', register.verificationCode)

export default router