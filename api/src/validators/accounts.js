import { body, query } from 'express-validator';
import { passwordsMatch } from './custom';

const emailValid = body('email').exists().isEmail();
const passwordValid = body('password')
    .exists()
    .isLength({ min: 15, max: 50 })
    .matches(/^[\w\!\@\#\$\%\^\*]+$/)
    .custom(passwordsMatch);
const activationTokenValid = query('t')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);
const passwordResetTokenValid = query('t')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);

const registerUserValidators = [emailValid, passwordValid];
const activateAccountValidators = [activationTokenValid];
const requestPasswordResetValidators = [emailValid];
const passwordResetRedirectValidators = [passwordResetTokenValid];

export {
    registerUserValidators,
    activateAccountValidators,
    requestPasswordResetValidators,
    passwordResetRedirectValidators,
};
