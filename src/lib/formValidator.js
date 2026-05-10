import * as Yup from 'yup';


export const registerValidator = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required'),
     image: Yup.mixed().test('file Type', 'Unsupported file', (val) => {
            return val && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type)
        }).required(),
});



export const loginValidator = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password id required'),
});


export const updateUserValidator = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    
});