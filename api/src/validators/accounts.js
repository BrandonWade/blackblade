import { body, param, cookie } from 'express-validator';

const passwordFieldValid = (fieldName) => {
    return body(fieldName)
        .exists()
        .isLength({ min: 15, max: 50 })
        .matches(/^[\w\!\@\#\$\%\^\&\*]+$/);
};

const passwordsMatch = (password, { req }) => {
    const confirmPassword = req.body['confirm_password'];

    if (password !== confirmPassword) {
        throw new Error('password and confirm password do not match');
    }

    return true;
};

const emailValid = body('email').exists().isEmail();
const passwordValid = passwordFieldValid('password').custom(passwordsMatch);
const currentPasswordValid = passwordFieldValid('current_password');
const newPasswordValid =
    passwordFieldValid('new_password').custom(passwordsMatch);
const activationTokenValid = param('activationToken')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);
const passwordResetTokenValid = param('passwordResetToken')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);
const passwordResetTokenCookieValid = cookie('prt')
    .exists()
    .isLength(64)
    .matches(/^[0-9a-f]+$/);

const registerUserValidators = [emailValid, passwordValid];
const activateAccountValidators = [activationTokenValid];
const requestPasswordResetValidators = [emailValid];
const passwordResetRedirectValidators = [passwordResetTokenValid];
const resetPasswordValidators = [passwordValid, passwordResetTokenCookieValid];
const changePasswordValidators = [currentPasswordValid, newPasswordValid];

export {
    registerUserValidators,
    activateAccountValidators,
    requestPasswordResetValidators,
    passwordResetRedirectValidators,
    resetPasswordValidators,
    changePasswordValidators,
};
