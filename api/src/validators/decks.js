import { body } from 'express-validator';

const visibilityValueValid = (visibility) => {
    const visibilityValues = ['public', 'private'];

    if (!visibilityValues.includes(visibility)) {
        throw new Error(
            `Deck visibility must be one of: ${visibilityValues.join(', ')}`,
        );
    }

    return true;
};

const cardValuesValid = (cards) => {
    let errors = [];

    cards.forEach((c) => {
        if (!Number.isInteger(parseInt(c.count))) {
            errors = errors.concat(
                `${c.name} (${c.location}) has invalid count value '${c.count}'`,
            );
        } else if (c.count <= 0) {
            errors = errors.concat(
                `${c.name} (${c.location}) count value must be greater than 0`,
            );
        }
    });

    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }

    return true;
};

const nameValid = body('name').exists().isLength({ max: 64 });
const visibilityValid = body('visibility')
    .exists()
    .custom(visibilityValueValid);
const notesValid = body('notes').exists().isLength({ max: 512 });
const deckValid = body('deck')
    .exists()
    .custom((deck) => cardValuesValid(deck));
const maybeboardValid = body('maybeboard')
    .exists()
    .custom((maybeboard) => cardValuesValid(maybeboard));
const lastUpdatedAtValid = body('lastUpdatedAt').exists().isISO8601();
const overwriteValid = body('overwrite').exists().isBoolean();

const createDeckValidators = [nameValid, visibilityValid, notesValid];
const saveDeckValidators = [
    nameValid,
    visibilityValid,
    notesValid,
    deckValid,
    maybeboardValid,
    lastUpdatedAtValid,
    overwriteValid,
];

export { createDeckValidators, saveDeckValidators };
