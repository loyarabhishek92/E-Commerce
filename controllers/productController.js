import Product from "../models/Product.js"
import { removeFile } from "../utils/removeFile.js";



export const createProduct = async (req, res) => {
    const { title, description, price, category, brand, stock } = req.body || {};

    try {
        await Product.create({
            title,
            description,
            price,
            category,
            brand,
            stock,
            image: req.imagePath,
        });
        return res.status(200).json({ message: 'Product created' });

    } catch (err) {
        await removeFile(`./uploads/${req.imagePath}`, res);
        return res.status(400).json({ message: err.message });
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });

    }
}





export const getProduct = async (req, res) => {
    try {
        const isExist = await Product.findById(req.id);

        if (!isExist) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(isExist);

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}





export const updateProduct = async (req, res) => {
    const { title, description, price, category, brand, stock } = req.body || {};

    try {
        const isExist = await Product.findById(req.id);

        if (!isExist) {
            if (req.imagePath) {
                await removeFile(`./uploads/${req.imagePath}`, res);
                return res.status(404).json({ message: 'Product not found' });
            } else {
                return res.status(404).json({ message: 'Product not found' });
            }
        }


        isExist.title = title || isExist.title;
        isExist.description = description || isExist.description;
        isExist.price = price || isExist.price;
        isExist.category = category || isExist.category;
        isExist.brand = brand || isExist.brand;
        isExist.stock = stock || isExist.stock;

        if (req.imagePath) {
            await removeFile(`./uploads/${isExist.image}`, res);
            isExist.image = req.imagePath;
            isExist.save();
            return res.status(200).json({ message: 'Product updated successfully' });

        }else{
            isExist.save();
            return res.status(200).json({message: 'Product updated successfully'});
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}




export const deleteProduct = async (req, res) => {
    try {
        const isExist = await Product.findById(req.id);

        if (!isExist) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (isExist.image) {
            await removeFile(`./uploads/${isExist.image}`);
        }

        await isExist.deleteOne();
        return res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}