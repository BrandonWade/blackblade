import { body } from 'express-validator';
import { visibilityValidValue, cardValuesValid } from './custom';

const nameValid = body('name').exists().isLength({ max: 64 });
const visibilityValid = body('visibility')
    .exists()
    .custom(visibilityValidValue);
const deckValid = body('deck')
    .exists()
    .custom((deck) => cardValuesValid(deck));
const maybeboardValid = body('maybeboard')
    .exists()
    .custom((maybeboard) => cardValuesValid(maybeboard));

const createDeckValidators = [nameValid, visibilityValid];
const saveDeckValidators = [
    nameValid,
    visibilityValid,
    deckValid,
    maybeboardValid,
];

export { createDeckValidators, saveDeckValidators };
