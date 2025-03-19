import express from 'express';
import restoredVehicleControllers from '../controllers/restoreVehiclesController.js';

const router = express.Router();

router.route('/')
.get(restoredVehicleControllers.getRestoredVehicle)
.post(restoredVehicleControllers.insertRestoredVehicle);

router.route('/:id')
.put(restoredVehicleControllers.updateRestoredVehicle)
.delete(restoredVehicleControllers.deleteRestoredVehicle)

export default router;
