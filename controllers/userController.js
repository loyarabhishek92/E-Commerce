import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const {username, email, password} = req.body || {};

    try {
        const isExist = await User.findOne({email});

        if(isExist){
            return res.status(409).json({message: 'User already exist'});
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await User.create({username, email, password:hashedPassword});

        return res.status(200).json({message: 'User created successfully'});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}




export const login = async (req, res) => {
    const {email, password} = req.body || {};

    try {
        const isExist = await User.findOne({email});

        if(!isExist){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = bcrypt.compareSync(password, isExist.password);

        if(!isMatch) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = jwt.sign({
            id: isExist._id,
            role: isExist.role,
        },
         'abhishek',
        //  {expiresIn: '2d'}
        );

        return res.status(200).json({
            role: isExist.role,
            token,
        });
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}



export const getUser = async (req, res) => {
    try {
        const isExist = await User.findById(req.userId).select('-password');

        if(!isExist){
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(isExist);
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}



export const updateUser = async (req, res) => {
    const {username, email} = req.body || {};

    try {
        const isExist = await User.findById(req.userId);

        if(!isExist){
            return res.status(404).json({message: 'User not found'});
        }

        isExist.username = username || isExist.username;
        isExist.email = email || isExist.email;
        await isExist.save();
        
        return res.status(200).json({message: 'User updated successfully'});

    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}