import { param } from 'express-validator';

const cardIDValid = param('id').isInt().toInt({ min: 1 });

const cardValidators = [cardIDValid];

export { cardValidators };
