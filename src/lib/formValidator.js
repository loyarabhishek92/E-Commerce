import * as Yup from 'yup';


export const registerValidator = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});



export const loginValidator = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password id required'),
});