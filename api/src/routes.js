import express from 'express';
import { searchValidators } from './validators/search';
import { cardValidators } from './validators/card';
import {
    registerUserValidators,
    activateAccountValidators,
    requestPasswordResetValidators,
    passwordResetRedirectValidators,
    resetPasswordValidators,
} from './validators/accounts';
import { loginValidators } from './validators/auth';
import {
    searchCards,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
} from './controllers/search';
import { createDeck, saveDeck, getDeck } from './controllers/decks';
import {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
} from './controllers/accounts';
import { login, logout } from './controllers/auth';
import validate from './middleware/validate';

const router = express.Router();

router.get('/search', searchValidators, validate(), searchCards);
router.get('/cards/random', getRandomCard);
router.get('/cards/:id', cardValidators, validate(), getCardByID);
router.get('/types', getCardTypes);
router.get('/sets', getCardSets);
router.post('/decks', createDeck);
router.put('/decks/:publicID', saveDeck);
router.get('/decks/:publicID', getDeck);
// router.post('/accounts', registerUserValidators, validate(), registerAccount);
// router.get(
//     '/accounts/activate',
//     activateAccountValidators,
//     validate(),
//     activateAccount,
// );
// router.post(
//     '/accounts/password/forgot',
//     requestPasswordResetValidators,
//     validate(),
//     requestPasswordReset,
// );
// router.get(
//     '/accounts/password/forgot',
//     passwordResetRedirectValidators,
//     validate('/'), // TODO: Redirect to the forgot password page
//     passwordResetRedirect,
// );
// router.post(
//     '/accounts/password',
//     resetPasswordValidators,
//     validate(),
//     resetPassword,
// );
// router.post('/login', loginValidators, validate(), login);
// router.get('/logout', logout);

export default router;
