import { check, body, query } from 'express-validator';
import { passwordsMatch } from './custom';

const emailValid = body('email').exists().isEmail();
const passwordValid = body('password')
    .exists()
    .isLength({ min: 15, max: 50 })
    .matches(/^[\w\!\@\#\$\%\^\*]+$/)
    .custom(passwordsMatch);
const activationTokenValid = query('bb_at')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);
const passwordResetTokenValid = check('bb_prt')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);

const registerUserValidators = [emailValid, passwordValid];
const activateAccountValidators = [activationTokenValid];
const requestPasswordResetValidators = [emailValid];
const passwordResetRedirectValidators = [passwordResetTokenValid];
const resetPasswordValidators = [passwordValid, passwordResetTokenValid];

export {
    registerUserValidators,
    activateAccountValidators,
    requestPasswordResetValidators,
    passwordResetRedirectValidators,
    resetPasswordValidators,
};
