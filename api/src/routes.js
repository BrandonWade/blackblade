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
import {
    search,
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
import validate from './middleware/validate';

const router = express.Router();

router.get('/search', searchValidators, validate, search);
router.get('/cards/random', getRandomCard);
router.get('/cards/:id', cardValidators, validate, getCardByID);
router.get('/types', getCardTypes);
router.get('/sets', getCardSets);
router.post('/decks', createDeck);
router.put('/decks/:publicID', saveDeck);
router.get('/decks/:publicID', getDeck);
// router.post('/accounts', registerUserValidators, validate, registerAccount);
// router.get(
//     '/accounts/activate',
//     activateAccountValidators,
//     validate,
//     activateAccount,
// );
// router.post(
//     '/accounts/password/forgot',
//     requestPasswordResetValidators,
//     validate,
//     requestPasswordReset,
// );
// router.get(
//     '/accounts/password/forgot',
//     passwordResetRedirectValidators,
//     validate, // TODO: Because this route is a simple redirect, this middleware might not work if validation fails
//     passwordResetRedirect,
// );
// router.post(
//     '/accounts/password',
//     resetPasswordValidators,
//     validate,
//     resetPassword,
// );

export default router;
