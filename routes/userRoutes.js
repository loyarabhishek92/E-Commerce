import express from 'express';
import { getUser, login, register, updateUser } from '../controllers/userController.js';
import { methodNotAllow } from '../utils/methodNotAllow.js';
import { loginSchema, registerSchema, validator } from '../utils/validators.js';
import { userCheck } from '../middlewares/userCheck.js';
import { userFileCheck } from '../middlewares/userFileCheck.js';

const router = express.Router();


router.route('/register').post(validator.body(registerSchema), userFileCheck, register).all(methodNotAllow);

router.route('/login').post(validator.body(loginSchema), login).all(methodNotAllow);

router.route('/profile').get(userCheck, getUser).patch(userCheck, updateUser).all(methodNotAllow);



export default router;