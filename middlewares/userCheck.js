import jwt from 'jsonwebtoken';


export const userCheck = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, 'abhishek');
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}



export const adminCheck = (req, res, next) => {
    if(req.role !== 'admin'){
        return res.status(403).json({message: 'Access Denied'});
    }
    next();
}