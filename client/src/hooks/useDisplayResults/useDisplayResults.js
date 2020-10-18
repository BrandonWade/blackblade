import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import CardContext from '../../contexts/CardContext';
import SearchContext from '../../contexts/SearchContext';

const useDisplayResults = () => {
    const history = useHistory();
    const { getParamString } = useSearch();
    const { setCard } = useContext(CardContext);
    const { setTotalResults, setSearchResults, setNumberOfPages } = useContext(SearchContext);

    const displayResults = (response = {}, params = {}, redirect = true, redirectForSingleResult = true) => {
        if (!response.success) {
            // TODO: Implement proper error handling
            console.error(response.errors);
            return;
        }

        let route;
        const numberOfPages = response.pages || 1;
        const totalResults = response.totalResults || 1;
        const results = response.results || [];
        const singleResult = results.length === 1 && totalResults === 1;
        if (redirectForSingleResult && singleResult) {
            setCard(results[0]);
            route = `/cards/${results[0].card_id}`;
        } else {
            setSearchResults(results);
            route = `/cards/search?${getParamString(params)}`;
        }

        setNumberOfPages(numberOfPages);
        setTotalResults(totalResults);

        if (redirect) {
            history.push(route);
        }
    };

    return {
        displayResults,
    };
};

export default useDisplayResults;
