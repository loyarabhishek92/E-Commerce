import express from 'express';
import { methodNotAllow } from '../utils/methodNotAllow.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { fileCheck, updateFileCheck } from '../middlewares/fileCheck.js';
import mongoose from 'mongoose';
import { adminCheck, userCheck } from '../middlewares/userCheck.js';

const router = express.Router();

router.route('/').get(getProducts).post(userCheck, adminCheck, fileCheck, createProduct).all(methodNotAllow);

router.param('id', (req, res, next, id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'Invalid ID'});
    }
    req.id = id;
    next();
});


router.route('/:id').get(getProduct).patch(userCheck, adminCheck, updateFileCheck, updateProduct).delete(userCheck, adminCheck, deleteProduct).all(methodNotAllow);

export default router;