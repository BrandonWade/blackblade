import express from 'express';
import validate from '../middleware/validate';
import {
    registerUserValidators,
    activateAccountValidators,
    requestPasswordResetValidators,
    passwordResetRedirectValidators,
    resetPasswordValidators,
} from '../validators/accounts';
import {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
} from '../controllers/accounts';
const accounts = express.Router();

accounts.post('/accounts', registerUserValidators, validate(), registerAccount);
accounts.get(
    '/accounts/activate/:activationToken',
    activateAccountValidators,
    validate(),
    activateAccount,
);
accounts.post(
    '/accounts/password/forgot',
    requestPasswordResetValidators,
    validate(),
    requestPasswordReset,
);
accounts.get(
    '/accounts/password/forgot/:passwordResetToken',
    passwordResetRedirectValidators,
    validate('/password/forgot'),
    passwordResetRedirect,
);
accounts.post(
    '/accounts/password',
    resetPasswordValidators,
    validate(),
    resetPassword,
);

export default accounts;
