import express from 'express'
import userControllers from '../controllers/userController.js'
import multer from 'multer'

const upload = multer({ dest: 'public/' })
const router = express.Router()

router.get('/', userControllers.getUsers)
router.put('/:id', upload.single('image'), userControllers.updateUser)
router.delete('/:id', userControllers.deleteUser)

export default router