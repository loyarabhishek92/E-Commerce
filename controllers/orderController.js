import Order from "../models/Order.js";



export const createOrder = async (req, res) => {
    const {totalAmount, products} = req.body;

    try {
        await Order.create({userId: req.userId, totalAmount, products});
        return res.status(200).json({message: 'Order created'});

    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}





export const getOrders = async (req, res) => {
    const id = req.userId;
    const role = req.userRole;

    try {
        if (role !== 'admin') {
            const orders = await Order.find({ userId: id }).populate([
                {
                    path: 'userId',
                    model: 'User',
                    select: '-password',
                },
                {
                    path: 'products.productId',
                    model: 'Product',
                }
            ]);
            return res.status(200).json({orders});
        } else {
            const orders = await Order.find({}).populate([
                {
                    path: 'userId',
                    model: 'User',
                    select: '-password',
                },
                {
                    path: 'products.productId',
                    model: 'Product',
                }
            ]);
            return res.status(200).json(orders);
        }

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}



export const getOrder = async (req, res) => {
    const {id} = req.params;

    try {
        const order = await Order.findById(id).populate([
            {
                path: 'userId',
                model: 'User',
                select: '-password',
            },
            {
                path: 'products.productId',
                model: 'Product',
            }
        ]);
        return res.status(200).json({order});
        
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}