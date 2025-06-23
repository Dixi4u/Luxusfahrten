import express from 'express';
import vehicleControllers from '../controllers/vehiclesController.js';
import multer from 'multer'


const router = express.Router();
const upload = multer({dest: 'public/'})

router.route('/')
.get(vehicleControllers.getVehicle)
.post(upload.single('image'), vehicleControllers.insertVehicle);

router.route('/:id')
.get(vehicleControllers.getVehicleById) // Ruta específica GET por ID
.delete(vehicleControllers.deleteVehicle)
.put(upload.single('image'), vehicleControllers.updateVehicle)

export default router;
