import { sortBy } from 'lodash';
import { parseIntFallback, parseFloatFallback } from '../../helpers/parse';
import {
    SET_DECK_PUBLIC_ID,
    SET_DECK_ACCOUNT_PUBLIC_ID,
    SET_DECK_NAME,
    SET_DECK_VISIBILITY,
    SET_DECK_NOTES,
    SET_DECK_CARDS,
    UPDATE_DECK_CARD_COUNT,
    UPDATE_DECK_CARD_ART,
    REMOVE_DECK_CARD,
    SET_MAYBEBOARD_CARDS,
    UPDATE_MAYBEBOARD_CARD_COUNT,
    UPDATE_MAYBEBOARD_CARD_ART,
    REMOVE_MAYBEBOARD_CARD,
    SET_DECK_LAST_UPDATED_AT,
    UPDATE_UNMODIFIED_STATE,
    SET_MAYBEBOARD_MODE,
    SET_DECK_EXISTS,
    SET_TOTAL_RESULTS,
    SET_SEARCH_RESULTS,
    SET_NUMBER_OF_PAGES,
    MOVE_TO_DECK,
    MOVE_TO_MAYBEBOARD,
    SET_SELECTED_TAB,
    SHOW_CARD_ART_SELECTOR,
    HIDE_CARD_ART_SELECTOR,
    SET_IS_SAVING,
    SET_IS_ERRORED,
    RESET_DECK_BUILDER,
} from '../../actions/DeckBuilder';
import { initialState } from '../../contexts/DeckBuilder';

export default function DeckBuilderReducer(state = {}, action = {}) {
    switch (action.type) {
        case SET_DECK_PUBLIC_ID:
            return {
                ...state,
                deckPublicID: action.deckPublicID,
            };

        case SET_DECK_ACCOUNT_PUBLIC_ID:
            return {
                ...state,
                deckAccountPublicID: action.deckAccountPublicID,
            };

        case SET_DECK_NAME:
            return {
                ...state,
                deckName: action.deckName,
            };

        case SET_DECK_VISIBILITY:
            return {
                ...state,
                deckVisibility: action.deckVisibility,
            };

        case SET_DECK_NOTES:
            return {
                ...state,
                deckNotes: action.deckNotes,
            };

        case SET_DECK_CARDS:
            return {
                ...state,
                deckCards: sortBy(action.deckCards, [c => parseFloatFallback(c.cmc, 0)]),
                isErrored: false,
            };

        case SET_DECK_EXISTS:
            return {
                ...state,
                deckExists: action.deckExists,
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
                isErrored: false,
            };
        }

        case UPDATE_DECK_CARD_ART: {
            const currentArtIndex = state.deckCards.findIndex(c => c.card_id === action.cardID);
            const newArtIndex = state.deckCards.findIndex(c => c.card_id === action.cardVariant.card_id);
            let deckCards;
            let updatedCard = {
                ...state.deckCards[currentArtIndex],
                ...action.cardVariant,
                selection_type: 'manual',
            };

            // Check if the selected variant already exists
            if (newArtIndex === -1) {
                deckCards = [...state.deckCards.slice(0, currentArtIndex), updatedCard, ...state.deckCards.slice(currentArtIndex + 1)];
            } else {
                // If the variant does exist, remove the current card and add it's count to the pre-existing variant
                const count = parseIntFallback(state.deckCards[currentArtIndex].count, 1) + parseIntFallback(state.deckCards[newArtIndex].count, 1);
                updatedCard = {
                    ...updatedCard,
                    count,
                };
                deckCards = [...state.deckCards.slice(0, newArtIndex), updatedCard, ...state.deckCards.slice(newArtIndex + 1)];
                deckCards = deckCards.filter(c => c.card_id !== action.cardID);
            }

            return {
                ...state,
                deckCards,
                cardArtSelectorVisible: false,
                isErrored: false,
            };
        }

        case REMOVE_DECK_CARD:
            return {
                ...state,
                deckCards: state.deckCards.filter(card => card.card_id !== action.cardID),
                isErrored: false,
            };

        case SET_MAYBEBOARD_CARDS:
            return {
                ...state,
                maybeboardCards: sortBy(action.maybeboardCards, [c => parseFloatFallback(c.cmc, 0)]),
                isErrored: false,
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
                isErrored: false,
            };
        }

        case UPDATE_MAYBEBOARD_CARD_ART: {
            const currentArtIndex = state.maybeboardCards.findIndex(c => c.card_id === action.cardID);
            const newArtIndex = state.maybeboardCards.findIndex(c => c.card_id === action.cardVariant.card_id);
            let maybeboardCards;
            let updatedCard = {
                ...state.maybeboardCards[currentArtIndex],
                ...action.cardVariant,
                selection_type: 'manual',
            };

            // Check if the selected variant already exists
            if (newArtIndex === -1) {
                maybeboardCards = [
                    ...state.maybeboardCards.slice(0, currentArtIndex),
                    updatedCard,
                    ...state.maybeboardCards.slice(currentArtIndex + 1),
                ];
            } else {
                // If the variant does exist, remove the current card and add it's count to the pre-existing variant
                const count =
                    parseIntFallback(state.maybeboardCards[currentArtIndex].count, 1) + parseIntFallback(state.maybeboardCards[newArtIndex].count, 1);
                updatedCard = {
                    ...updatedCard,
                    count,
                };
                maybeboardCards = [...state.maybeboardCards.slice(0, newArtIndex), updatedCard, ...state.maybeboardCards.slice(newArtIndex + 1)];
                maybeboardCards = maybeboardCards.filter(c => c.card_id !== action.cardID);
            }

            return {
                ...state,
                maybeboardCards,
                cardArtSelectorVisible: false,
                isErrored: false,
            };
        }

        case REMOVE_MAYBEBOARD_CARD:
            return {
                ...state,
                maybeboardCards: state.maybeboardCards.filter(card => card.card_id !== action.cardID),
                isErrored: false,
            };

        case SET_DECK_LAST_UPDATED_AT:
            return {
                ...state,
                deckLastUpdatedAt: action.deckLastUpdatedAt,
            };

        case UPDATE_UNMODIFIED_STATE:
            return {
                ...state,
                unmodifiedDeckName: state.deckName,
                unmodifiedDeckVisibility: state.deckVisibility,
                unmodifiedDeckNotes: state.deckNotes,
                unmodifiedDeckCards: state.deckCards,
                unmodifiedMaybeboardCards: state.maybeboardCards,
                isSaving: false,
                isErrored: false,
            };

        case SET_MAYBEBOARD_MODE:
            return {
                ...state,
                maybeboardMode: action.maybeboardMode,
            };

        case SET_TOTAL_RESULTS:
            return {
                ...state,
                totalResults: action.totalResults,
            };

        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults,
            };

        case SET_NUMBER_OF_PAGES:
            return {
                ...state,
                numberOfPages: action.numberOfPages,
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
                deckCards = sortBy(deckCards, [c => parseFloatFallback(c.cmc, 0)]);
            } else {
                const count = parseIntFallback(deckCard.count, 1) + parseIntFallback(action.count, 1);
                deckCards = [
                    ...state.deckCards.slice(0, indexInDeck),
                    {
                        ...deckCard,
                        location: 'deck',
                        count,
                    },
                    ...state.deckCards.slice(indexInDeck + 1),
                ];
            }

            return {
                ...state,
                deckCards,
                maybeboardCards,
                isErrored: false,
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
                maybeboardCards = sortBy(maybeboardCards, [c => parseFloatFallback(c.cmc, 0)]);
            } else {
                const count = parseIntFallback(maybeboardCard.count, 1) + parseIntFallback(action.count, 1);
                maybeboardCards = [
                    ...state.maybeboardCards.slice(0, indexInMaybeboard),
                    {
                        ...maybeboardCard,
                        location: 'maybeboard',
                        count,
                    },
                    ...state.maybeboardCards.slice(indexInMaybeboard + 1),
                ];
            }

            return {
                ...state,
                deckCards,
                maybeboardCards,
                isErrored: false,
            };
        }

        case SET_SELECTED_TAB: {
            return {
                ...state,
                selectedTab: action.id,
            };
        }
        case SHOW_CARD_ART_SELECTOR: {
            return {
                ...state,
                cardArtSelectorVisible: true,
            };
        }

        case HIDE_CARD_ART_SELECTOR: {
            return {
                ...state,
                cardArtSelectorVisible: false,
            };
        }

        case SET_IS_SAVING: {
            return {
                ...state,
                isSaving: true,
                isErrored: false,
            };
        }

        case SET_IS_ERRORED: {
            return {
                ...state,
                isSaving: false,
                isErrored: true,
            };
        }

        case RESET_DECK_BUILDER: {
            return {
                ...initialState,
            };
        }

        default:
            return state;
    }
}
