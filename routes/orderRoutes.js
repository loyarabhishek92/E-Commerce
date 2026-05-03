import express from 'express';
import { createOrder, getOrder, getOrders } from '../controllers/orderController.js';
import { methodNotAllow } from '../utils/methodNotAllow.js';
import { userCheck } from '../middlewares/userCheck.js';
import mongoose from 'mongoose';

const router = express.Router();

router.route('/').get(userCheck, getOrders).post(userCheck, createOrder).all(methodNotAllow);

router.param('id', (req, res, next, id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'Invalid order id'});
    }
    req.productId = id;
    next();
});

router.route('/:id').get(userCheck, getOrder).all(methodNotAllow);

export default router;