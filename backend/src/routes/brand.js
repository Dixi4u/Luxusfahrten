import express from 'express';
import brandControllers from '../controllers/brandsController.js';

const router = express.Router();

router.route('/').get(brandControllers.getAllBrands)
.post(brandControllers.insertBrand);

router.route('/:id')
.put(brandControllers.updateBrand)
.delete(brandControllers.deleteBrand)

export default router;
