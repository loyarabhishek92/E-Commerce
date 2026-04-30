import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
   try {
        const products = await Product.find({});
        return res.status(200).json({products});
   } catch (err) {
    return res.status(400).json({
        message: err.message
    });
    
   }
}

export const createProduct =  (req, res) => {
    return res.status(200).json({
        message: 'product created',
    })
}