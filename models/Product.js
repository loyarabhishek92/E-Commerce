import mongoose from "mongoose";

export const categories = [
    "Electronics",
    "Clothing",
];

export const brands = [
    "Apple",
    "Puma",
];

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: categories,
            required: true,
        },
        brand: {
            type: String,
            enum: brands,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;