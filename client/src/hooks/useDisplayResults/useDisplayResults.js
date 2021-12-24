import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useSearch from '../useSearch';
import SearchContext from '../../contexts/Search';

export default function useDisplayResults() {
    const history = useHistory();
    const location = useLocation();
    const { getParamString } = useSearch();
    const { setTotalResults, setSearchResults, setNumberOfPages } = useContext(SearchContext);

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

    const displayResults = (response = {}, setSearchResults = () => {}, setNumberOfPages = () => {}, setTotalResults = () => {}) => {
        if (!response.success) {
            return;
        }

        setSearchResults(response.results || []);
        setNumberOfPages(response.pages || 1);
        setTotalResults(response.totalResults || 0);
    };

    return {
        cardRedirect,
        searchResultsRedirect,
        displayResults,
    };
}
