import express from 'express'
import register from '../controllers/registerModeratorController.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'public/' })

router.route("/").post(upload.single('image'), register.registerModerator)

export default router