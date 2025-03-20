import express from 'express';
import salesController from '../controllers/salesController.js';

const router = express.Router();

router.route('/')
.get(salesController.getSales)
.post(salesController.insertSale);

router.route('/:id')
.put(salesController.updateSale)
.delete(salesController.deleteSale);

export default router;