import { useContext } from 'react';
import CardFaceContext from '../../contexts/CardFaceContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';

const useDisplayResults = () => {
    const { setPrimaryCardFace, setSecondaryCardFace } = useContext(CardFaceContext);
    const { setTotalResults, setSearchResults, setNumberOfPages, setCurrentPage } = useContext(SearchResultsContext);

    const displayResults = (response = {}, currentPage = 1, redirectForSingleResult = true) => {
        console.log('START OF DISPLAY RESULTS', response);
        console.log('REIDRECT FSR', redirectForSingleResult);
        if (!response.success) {
            // TODO: Implement proper error handling
            console.error(response.errors);
            return;
        }

        const numberOfPages = response.pages || 1;
        const totalResults = response.totalResults || 0;
        const results = response.results || [];
        const singleResult = results.length === 1 || (results.length === 2 && results[0].card_id === results[1].card_id);
        if (redirectForSingleResult && singleResult) {
            console.log('SINGLE RES', results);
            const primaryCardFace = results[0];
            const secondaryCardFace = results?.[1] || {};

            setPrimaryCardFace(primaryCardFace);
            setSecondaryCardFace(secondaryCardFace);
        } else {
            setSearchResults(results);
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
