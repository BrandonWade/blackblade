import {
    SET_DECK_NAME,
    SET_DECK_CARDS,
    UPDATE_DECK_CARD_COUNT,
    REMOVE_DECK_CARD,
    SET_MAYBEBOARD_CARDS,
    UPDATE_MAYBEBOARD_CARD_COUNT,
    REMOVE_MAYBEBOARD_CARD,
    SET_UNMODIFIED_DECK_NAME,
    SET_UNMODIFIED_DECK_CARDS,
    SET_UNMODIFIED_MAYBEBOARD_CARDS,
    SET_MAYBEBOARD_MODE,
    MOVE_TO_DECK,
    MOVE_TO_MAYBEBOARD,
} from '../../actions/DeckBuilder';

function DeckBuilderReducer(state = {}, action = {}) {
    switch (action.type) {
        case SET_DECK_NAME:
            return {
                ...state,
                deckName: action.deckName,
            };

        case SET_DECK_CARDS:
            return {
                ...state,
                deckCards: action.deckCards,
            };

        case UPDATE_DECK_CARD_COUNT: {
            const index = state.deckCards.findIndex(card => card.card_id === action.cardID);
            return {
                ...state,
                deckCards: [
                    ...state.deckCards.slice(0, index),
                    {
                        ...state.deckCards[index],
                        count: action.count,
                    },
                    ...state.deckCards.slice(index + 1),
                ],
            };
        }

        case REMOVE_DECK_CARD:
            return {
                ...state,
                deckCards: state.deckCards.filter(card => card.card_id !== action.cardID),
            };

        case SET_MAYBEBOARD_CARDS:
            return {
                ...state,
                maybeboardCards: action.maybeboardCards,
            };

        case UPDATE_MAYBEBOARD_CARD_COUNT: {
            const index = state.maybeboardCards.findIndex(card => card.card_id === action.cardID);
            return {
                ...state,
                maybeboardCards: [
                    ...state.maybeboardCards.slice(0, index),
                    {
                        ...state.maybeboardCards[index],
                        count: action.count,
                    },
                    ...state.maybeboardCards.slice(index + 1),
                ],
            };
        }

        case REMOVE_MAYBEBOARD_CARD:
            return {
                ...state,
                maybeboardCards: state.maybeboardCards.filter(card => card.card_id !== action.cardID),
            };

        case SET_UNMODIFIED_DECK_NAME:
            return {
                ...state,
                unmodifiedDeckName: state.deckName,
            };

        case SET_UNMODIFIED_DECK_CARDS:
            return {
                ...state,
                unmodifiedDeckCards: state.deckCards,
            };

        case SET_UNMODIFIED_MAYBEBOARD_CARDS:
            return {
                ...state,
                unmodifiedMaybeboardCards: state.maybeboardCards,
            };

        case SET_MAYBEBOARD_MODE:
            return {
                ...state,
                maybeboardMode: action.maybeboardMode,
            };

        case MOVE_TO_DECK: {
            const maybeboardCard = state.maybeboardCards.find(card => card.card_id === action.cardID);
            const maybeboardCards = state.maybeboardCards.filter(card => card.card_id !== action.cardID);
            const indexInDeck = state.deckCards.findIndex(card => card.card_id === action.cardID);
            const deckCard = state.deckCards[indexInDeck];
            let deckCards;

            if (indexInDeck === -1) {
                deckCards = [
                    ...state.deckCards,
                    {
                        ...maybeboardCard,
                        location: 'deck',
                    },
                ];
            } else {
                const count = parseInt(deckCard.count) + parseInt(action.count);
                deckCards = [
                    ...state.deckCards.slice(0, indexInDeck),
                    {
                        ...deckCard,
                        location: 'deck',
                        count: count ?? 1,
                    },
                    ...state.deckCards.slice(indexInDeck + 1),
                ];
            }

            return {
                ...state,
                deckCards,
                maybeboardCards,
            };
        }

        case MOVE_TO_MAYBEBOARD: {
            const deckCard = state.deckCards.find(card => card.card_id === action.cardID);
            const deckCards = state.deckCards.filter(card => card.card_id !== action.cardID);
            const indexInMaybeboard = state.maybeboardCards.findIndex(card => card.card_id === action.cardID);
            const maybeboardCard = state.maybeboardCards[indexInMaybeboard];
            let maybeboardCards;

            if (indexInMaybeboard === -1) {
                maybeboardCards = [
                    ...state.maybeboardCards,
                    {
                        ...deckCard,
                        location: 'maybeboard',
                    },
                ];
            } else {
                const count = parseInt(maybeboardCard.count) + parseInt(action.count);
                maybeboardCards = [
                    ...state.maybeboardCards.slice(0, indexInMaybeboard),
                    {
                        ...maybeboardCard,
                        location: 'maybeboard',
                        count: count ?? 1,
                    },
                    ...state.maybeboardCards.slice(indexInMaybeboard + 1),
                ];
            }

            return {
                ...state,
                deckCards,
                maybeboardCards,
            };
        }

        default:
            return state;
    }
}

export default DeckBuilderReducer;
