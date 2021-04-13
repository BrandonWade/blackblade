import express from 'express';
import { searchValidators } from './validators/search';
import { cardValidators } from './validators/card';
import { createDeckValidators, saveDeckValidators } from './validators/deck';
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
import {
    createDeck,
    saveDeck,
    getDeck,
    listDecks,
    deleteDeck,
} from './controllers/decks';
import {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
} from './controllers/accounts';
import { login, logout } from './controllers/auth';
import validate from './middleware/validate';
import authenticate from './middleware/authenticate';

const router = express.Router();

router.get('/search', searchValidators, validate(), searchCards);
router.get('/cards/random', getRandomCard);
router.get('/cards/:id', cardValidators, validate(), getCardByID);
router.get('/types', getCardTypes);
router.get('/sets', getCardSets);
router.post(
    '/decks',
    createDeckValidators,
    validate(),
    authenticate(
        'You must be logged in to create a deck. Please log in and try again.',
    ),
    createDeck,
);
router.put(
    '/decks/:publicID',
    saveDeckValidators,
    validate(),
    authenticate(
        'You do not have permission to modify this deck. If this deck is yours, please log in and try again.',
    ),
    saveDeck,
);
router.get(
    '/decks',
    authenticate(
        'You must be logged in to view your decks. Please log in and try again.',
    ),
    listDecks,
);
router.get('/decks/:publicID', getDeck);
router.delete('/decks/:publicID', deleteDeck);
router.post('/accounts', registerUserValidators, validate(), registerAccount);
router.get(
    '/accounts/activate/:activationToken',
    activateAccountValidators,
    validate(),
    activateAccount,
);
router.post(
    '/accounts/password/forgot',
    requestPasswordResetValidators,
    validate(),
    requestPasswordReset,
);
router.get(
    '/accounts/password/forgot/:passwordResetToken',
    passwordResetRedirectValidators,
    validate('/password/forgot'),
    passwordResetRedirect,
);
router.post(
    '/accounts/password',
    resetPasswordValidators,
    validate(),
    resetPassword,
);
router.post('/login', loginValidators, validate(), login);
router.get('/logout', logout);

export default router;
