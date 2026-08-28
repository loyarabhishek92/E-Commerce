import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const supportedTypes = ['.jpg', '.png', '.jpeg', '.webp', '.gif', '.svg']

export const userFileCheck = (req, res, next) => {
    const file = req.files?.image;

    if (!file) {
        return res.status(400).json({ message: 'Image is required' });
    }

    const exts = path.extname(file.name);

    if (!supportedTypes.includes(exts)) {
        return res.status(400).json({ message: 'Unsupported file type' });
    }

    const imagePath = `${uuidv4()}-${file.name}`;

    file.mv(`./uploads/users/${imagePath}`, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        } else {
            req.imagePath = imagePath;
            next();
        }
    });
}


export const userUpdateFileCheck = (req, res, next) => {
    const file = req.files?.image;

    if(!file){
        return next();
    }

    const exts = path.extname(file.name);

    if(!supportedTypes.includes(exts)){
        return res.status(400).json({message: 'Unsupportd file type'});
    }

    const imagePath = `${uuidv4()}-${file.name}`;

    file.mv(`./uploads/users/${imagePath}`, (err) => {
        if(err) {
            return res.status(500).json({message: err.message});
        }else {
            req.imagePath = imagePath;
            next();
        }
    });
}