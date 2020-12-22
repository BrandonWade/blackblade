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

    const displayResults = (response = {}, params = {}, redirect = true, redirectForSingleResult = true) => {
        if (!response.success) {
            addErrors(response.errors);
            return;
        }

        let route;
        const numberOfPages = response.pages || 1;
        const totalResults = response.totalResults || 0;
        const results = response.results || [];
        const singleResult = results.length === 1 && totalResults <= 1;
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
}

export default useDisplayResults;
