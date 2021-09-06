import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useSearch from '../useSearch';
import useMessage from '../../hooks/useMessage';
import SearchContext from '../../contexts/Search';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useDisplayResults() {
    const history = useHistory();
    const location = useLocation();
    const { getParamString } = useSearch();
    const { showMessage } = useMessage();
    const { setTotalResults, setSearchResults, setNumberOfPages } = useContext(SearchContext);
    const {
        setTotalResults: setDeckBuilderTotalResults,
        setSearchResults: setDeckBuilderSearchResults,
        setNumberOfPages: setDeckBuilderNumberOfPages,
    } = useContext(DeckBuilderContext);

    const cardRedirect = (card = {}) => {
        history.replace(`/cards/${card.card_id}`);
    };

    const searchResultsRedirect = (params = {}) => {
        const paramString = getParamString(params);
        if (paramString === undefined || paramString === location.search) {
            return;
        }

        setTotalResults(0);
        setNumberOfPages(1);
        setSearchResults([]);
        history.push(`/cards/search${paramString}`);
    };

    const displayResults = (response = {}, deckBuilder = false) => {
        if (!response.success) {
            const { text, type } = response?.message;
            showMessage(text, type);
            return;
        }

        const updateSearchResults = deckBuilder ? setDeckBuilderSearchResults : setSearchResults;
        const updateNumberOfPages = deckBuilder ? setDeckBuilderNumberOfPages : setNumberOfPages;
        const updateTotalResults = deckBuilder ? setDeckBuilderTotalResults : setTotalResults;
        updateSearchResults(response.results || []);
        updateNumberOfPages(response.pages || 1);
        updateTotalResults(response.totalResults || 0);
    };

    return {
        cardRedirect,
        searchResultsRedirect,
        displayResults,
    };
}
