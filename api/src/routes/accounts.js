import express from 'express';
import validate from '../middleware/validate';
import {
    registerUserValidators,
    activateAccountValidators,
    requestPasswordResetValidators,
    passwordResetRedirectValidators,
    resetPasswordValidators,
    changePasswordValidators,
} from '../validators/accounts';
import {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
    changePassword,
} from '../controllers/accounts';

const accounts = express.Router();

accounts.post('/', registerUserValidators, validate(), registerAccount);
accounts.get(
    '/activate/:activationToken',
    activateAccountValidators,
    validate(),
    activateAccount,
);
accounts.post(
    '/password/forgot',
    requestPasswordResetValidators,
    validate(),
    requestPasswordReset,
);
accounts.get(
    '/password/forgot/:passwordResetToken',
    passwordResetRedirectValidators,
    validate('/password/forgot'),
    passwordResetRedirect,
);
accounts.post(
    '/password/reset',
    resetPasswordValidators,
    validate(),
    resetPassword,
);
// accounts.post(
//     '/password/change',
//     changePasswordValidators,
//     validate(),
//     changePassword,
// );

export default accounts;
