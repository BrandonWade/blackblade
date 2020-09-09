import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardFaceContext from '../../contexts/CardFaceContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';

const useResultsRedirect = () => {
    const history = useHistory();
    const { primaryCardFace } = useContext(CardFaceContext);
    const { query, currentPage } = useContext(SearchResultsContext);

    const resultsRedirect = (response = {}) => {
        console.log('START OF RESULTS REDIRECT', response);
        if (!response.success) {
            // TODO: Implement proper error handling
            console.error(response.errors);
            return;
        }

        const results = response?.results || [];
        if (results.length === 1 || (results.length === 2 && results[0].card_id === results[1].card_id)) {
            console.log('PCF', primaryCardFace);
            history.push(`/cards/${primaryCardFace.card_id}`);
        } else {
            history.push(`/cards/search?q=${query}&page=${currentPage}`);
        }
    };

    return {
        resultsRedirect,
    };
};

export default useResultsRedirect;
