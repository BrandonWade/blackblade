import useFetch from '../useFetch';
import { trimCards } from '../../helpers/deck';

export default function useDecks() {
    const { fetchJSON } = useFetch();

    const createDeck = async (name = '', visibility = 'private', notes = '') => {
        const response = await fetchJSON('/api/decks', 'POST', { name, visibility, notes });

        switch (response.status) {
            case 201:
                return {
                    success: true,
                    deckPublicID: response.data.deck_public_id,
                    accountPublicID: response.data.account_public_id,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const saveDeck = async (
        publicID = '',
        name = '',
        visibility = 'private',
        notes = '',
        deckCards = [],
        maybeboardCards = [],
        lastUpdatedAt = '',
        overwrite = false
    ) => {
        const deck = trimCards(deckCards, 'deck');
        const maybeboard = trimCards(maybeboardCards, 'maybeboard');
        const response = await fetchJSON(`/api/decks/${publicID}`, 'PUT', { name, visibility, notes, deck, maybeboard, lastUpdatedAt, overwrite });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    deckPublicID: response.data.deck_public_id,
                    accountPublicID: response.data.account_public_id,
                    name: response.data.name,
                    visibility: response.data.visibility,
                    notes: response.data.notes,
                    cards: response.data.cards,
                    lastUpdatedAt: response.data.last_updated_at,
                };
            case 409:
                return {
                    success: false,
                    confirmation: true,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const getDeck = async (publicID = '') => {
        const response = await fetchJSON(`/api/decks/${publicID}`);

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    deckPublicID: response.data.deck_public_id,
                    accountPublicID: response.data.account_public_id,
                    name: response.data.name,
                    visibility: response.data.visibility,
                    notes: response.data.notes,
                    cards: response.data.cards,
                    lastUpdatedAt: response.data.last_updated_at,
                };
            }
            case 404:
                return {
                    success: false,
                };
            default: {
                return {
                    success: false,
                };
            }
        }
    };

    const listDecks = async () => {
        const response = await fetchJSON('/api/decks');

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    decks: response.data.decks,
                };
            }
            case 401:
                return {
                    success: false,
                };
            default: {
                return {
                    success: false,
                };
            }
        }
    };

    const deleteDeck = async (publicID = '') => {
        const response = await fetchJSON(`/api/decks/${publicID}`, 'DELETE');

        switch (response.status) {
            case 204:
                return {
                    success: true,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const exportDeck = async (publicID = '') => {
        const response = await fetchJSON(`/api/decks/${publicID}/export`, 'GET');

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    deckExport: response.data.deck_export,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    return {
        createDeck,
        saveDeck,
        getDeck,
        listDecks,
        deleteDeck,
        exportDeck,
    };
}
