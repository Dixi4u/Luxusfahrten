import express from 'express'
import providerController from '../controllers/providerController.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({dest: 'public/'})

router.route('/')
.get(providerController.getProviders)
.post(upload.single('image'), providerController.insertProvider)

router.route('/:id')
.put(upload.single('image'), providerController.updateProvider)
.delete(providerController.deleteProvider)

export default router;