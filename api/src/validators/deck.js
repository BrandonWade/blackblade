import { body } from 'express-validator';
import { visibilityValidValue } from './custom';

const nameValid = body('name').exists().isLength({ max: 64 });
const visibilityValid = body('visibility')
    .exists()
    .custom(visibilityValidValue);

const createDeckValidators = [nameValid, visibilityValid];
const saveDeckValidators = [nameValid, visibilityValid];

export { createDeckValidators, saveDeckValidators };
