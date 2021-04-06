import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../useSearch';
import CardContext from '../../contexts/Card';
import SearchContext from '../../contexts/Search';

function useDisplayResults() {
    const history = useHistory();
    const { getParamString } = useSearch();
    const { setCard } = useContext(CardContext);
    const { setTotalResults, setSearchResults, setNumberOfPages } = useContext(SearchContext);

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

    const displayResults = (response = {}) => {
        if (!response.success) {
            return;
        }

        const numberOfPages = response.pages || 1;
        const totalResults = response.totalResults || 0;
        const results = response.results || [];
        setSearchResults(results);
        setNumberOfPages(numberOfPages);
        setTotalResults(totalResults);
    };

    return {
        cardRedirect,
        searchResultsRedirect,
        displayCard,
        displayResults,
    };
}

export default useDisplayResults;
