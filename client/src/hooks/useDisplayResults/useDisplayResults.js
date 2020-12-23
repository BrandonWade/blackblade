import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../useSearch';
import useErrors from '../useErrors';
import CardContext from '../../contexts/Card';
import SearchContext from '../../contexts/Search';

function useDisplayResults() {
    const history = useHistory();
    const { getParamString } = useSearch();
    const { addErrors } = useErrors();
    const { setCard } = useContext(CardContext);
    const { setTotalResults, setSearchResults, setNumberOfPages } = useContext(SearchContext);

    const searchResultsRedirect = (params = {}) => {
        history.push(`/cards/search?${getParamString(params)}`);
    };

    const displayCard = (response = {}) => {
        setCard(response?.results?.[0] || {});
    };

    const displayResults = (response = {}) => {
        if (!response.success) {
            addErrors(response.errors);
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
        searchResultsRedirect,
        displayCard,
        displayResults,
    };
}

export default useDisplayResults;
