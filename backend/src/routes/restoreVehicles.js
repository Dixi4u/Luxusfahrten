import express from 'express';
import restoredVehicleControllers from '../controllers/restoreVehiclesController.js';
import multer from 'multer'

const router = express.Router();
const upload = multer({dest: 'public/'})

router.route('/')
.get(restoredVehicleControllers.getRestoredVehicle)
.post(upload.single('image'), restoredVehicleControllers.insertRestoredVehicle)

router.route('/:id')
.delete(restoredVehicleControllers.deleteRestoredVehicle)
.put(upload.single('image'), restoredVehicleControllers.updateRestoredVehicle)

export default router;
