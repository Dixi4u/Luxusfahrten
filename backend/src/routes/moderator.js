import express from 'express'
import moderatorControllers from '../controllers/moderatorController.js'
import multer from 'multer'

const upload = multer({ dest: 'public/' })
const router = express.Router()

router.get('/', moderatorControllers.getModerators)

router.put('/:id', upload.single('image'), moderatorControllers.updateModerator)
router.delete('/:id', moderatorControllers.deleteModerator)

export default router
