import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 5000;


const limiter = rateLimit({
    limit: 5,
    windowMs: 10*60*100,
    message: 'To many requests form this IP, please try again after an hours',
});
app.use(limiter);

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}));
app.use(express.static('uploads/products'));
app.use(express.static('uploads/users'));
app.use(cors({
    origin: ['http://localhost:5173', 'https://e-commerce-cyan-two-40.vercel.app'],
}));

//DB connection
mongoose.connect('mongodb+srv://Abhishek:abhishek200@cluster0.d7y0puu.mongodb.net/E-Commerce').then((val) => {
    app.listen(port, () => {
        console.log(`Database connected and Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello!, Welcome to E-Commerce API',
    })
});

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);