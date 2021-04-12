import { body } from 'express-validator';
import { visibilityValidValue, cardValuesValid } from './custom';

const nameValid = body('name').exists().isLength({ max: 64 });
const visibilityValid = body('visibility')
    .exists()
    .custom(visibilityValidValue);
const cardsValid = body('cards').exists().custom(cardValuesValid);

const createDeckValidators = [nameValid, visibilityValid];
const saveDeckValidators = [nameValid, visibilityValid, cardsValid];

export { createDeckValidators, saveDeckValidators };
