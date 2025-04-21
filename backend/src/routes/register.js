import express from 'express'
import register from '../controllers/registerController.js'

const router = express.Router()

router.route("/").post(register.Register)

export default router