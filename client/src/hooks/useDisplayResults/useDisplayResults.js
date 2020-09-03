import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardFaceContext from '../../contexts/CardFaceContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';

const useDisplayResults = () => {
    const history = useHistory();
    const { setPrimaryCardFace, setSecondaryCardFace } = useContext(CardFaceContext);
    const { setTotalResults, setSearchResults, setNumberOfPages, setCurrentPage } = useContext(SearchResultsContext);

    const displayResults = (response = {}, query = '', currentPage = 1) => {
        if (!response.success) {
            // TODO: Implement proper error handling
            console.error(response.errors);
            return;
        }

        const numberOfPages = response.pages || 1;
        const totalResults = response.totalResults || 0;
        const results = response.results || [];
        if (results.length === 1 || (results.length === 2 && results[0].id === results[1].id)) {
            const primaryCardFace = results[0];
            const secondaryCardFace = results?.[1] || null;

            setPrimaryCardFace(primaryCardFace);
            setSecondaryCardFace(secondaryCardFace);
            history.push(`/cards/${primaryCardFace.id}`);
        } else {
            setSearchResults(results);
            history.push(`/cards/search?q=${query}&page=${currentPage}`);
        }

        setCurrentPage(currentPage);
        setNumberOfPages(numberOfPages);
        setTotalResults(totalResults);
    };

    return {
        displayResults,
    };
};

export default useDisplayResults;
