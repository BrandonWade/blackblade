import { body } from 'express-validator';
import { passwordsMatch } from './custom';

const emailValid = body('email').exists().isEmail();
const passwordValid = body('password')
    .exists()
    .isLength({ min: 15, max: 50 })
    .matches(/^[\w\!\@\#\$\%\^\*]+$/)
    .custom(passwordsMatch);

const validators = [emailValid, passwordValid];

export default validators;
