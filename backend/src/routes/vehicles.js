import express from 'express';
import vehicleControllers from '../controllers/vehiclesController.js';

const router = express.Router();

router.route('/')
.get(vehicleControllers.getVehicle)
.post(vehicleControllers.insertVehicle);

router.route('/:id')
.put(vehicleControllers.updateVehicle)
.delete(vehicleControllers.deleteVehicle)

export default router;
