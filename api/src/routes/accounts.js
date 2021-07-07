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
accounts.post('/password', resetPasswordValidators, validate(), resetPassword);

export default accounts;
