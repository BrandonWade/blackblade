import { body } from 'express-validator';

const cardIDValid = body('cardID').exists().isInt({ min: 1 });

const createBookmarkValidators = [cardIDValid];

export { createBookmarkValidators };
