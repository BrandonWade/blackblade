import { body } from 'express-validator';

const emailValid = body('email').exists().isEmail();
const passwordValid = body('password')
    .exists()
    .isLength({ min: 15, max: 50 })
    .matches(/^[\w!@#$%^&*]+$/);

const loginValidators = [emailValid, passwordValid];

export { loginValidators };
