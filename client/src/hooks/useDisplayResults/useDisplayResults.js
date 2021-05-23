import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../useSearch';
import CardContext from '../../contexts/Card';
import SearchContext from '../../contexts/Search';
import DeckBuilderContext from '../../contexts/DeckBuilder';

function useDisplayResults() {
    const history = useHistory();
    const { getParamString } = useSearch();
    const { setCard } = useContext(CardContext);
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
        if (paramString === undefined) {
            return;
        }

        setTotalResults(0);
        setNumberOfPages(1);
        setSearchResults([]);
        history.push(`/cards/search?${paramString}`);
    };

    const displayCard = (response = {}) => {
        if (!response.success) {
            return;
        }

        setCard(response?.results?.[0] || {});
    };

    const displayResults = (response = {}, deckBuilder = false) => {
        if (!response.success) {
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
        displayCard,
        displayResults,
    };
}

export default useDisplayResults;
