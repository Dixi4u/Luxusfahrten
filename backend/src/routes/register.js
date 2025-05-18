import express from 'express'
import register from '../controllers/registerModeratorController.js'

const router = express.Router()

router.route("/").post(register.registerModerator)

export default router