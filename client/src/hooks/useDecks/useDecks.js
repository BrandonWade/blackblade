import useFetch from '../useFetch';
import { trimCards } from '../../helpers/deck';

export default function useDecks() {
    const { fetchData, fetchJSON } = useFetch();

    const createDeck = async (name = '', visibility = 'private', notes = '') => {
        const response = await fetchData('/api/decks', 'POST', { name, visibility, notes });
        const data = await response.json();

        switch (response.status) {
            case 201:
                return {
                    success: true,
                    deckPublicID: data.deck_public_id,
                    accountPublicID: data.account_public_id,
                };
            default:
                return {
                    success: false,
                    message: data.message,
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
                // TODO: Call showConfirmDialog()
                return {
                    success: false,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const getDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}`);

        switch (response.status) {
            case 200: {
                const data = await response.json();
                return {
                    success: true,
                    deckPublicID: data.deck_public_id,
                    accountPublicID: data.account_public_id,
                    name: data.name,
                    visibility: data.visibility,
                    notes: data.notes,
                    cards: data.cards,
                    lastUpdatedAt: data.last_updated_at,
                };
            }
            case 404:
                return {
                    success: false,
                };
            default: {
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    };

    const listDecks = async () => {
        const response = await fetchData('/api/decks');
        const data = await response.json();

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    decks: data.decks,
                };
            }
            case 401:
                return {
                    success: false,
                    message: data.message,
                };
            default: {
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    };

    const deleteDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}`, 'DELETE');

        switch (response.status) {
            case 204:
                return {
                    success: true,
                };
            default:
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const exportDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}/export`, 'GET');
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    deckExport: data.deck_export,
                };
            default:
                return {
                    success: false,
                    message: data.message,
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
