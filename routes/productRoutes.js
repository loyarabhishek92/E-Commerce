import express from 'express';
import { methodNotAllow } from '../utils/methodNotAllow.js';
import { createProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct).all(methodNotAllow);

export default router;