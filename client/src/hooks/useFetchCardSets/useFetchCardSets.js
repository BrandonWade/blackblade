import { useContext, useCallback } from 'react';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import ErrorContext from '../../contexts/Error';

function useFetchCardSets() {
    const { setCardSets } = useContext(AdvancedSearchContext);
    const { setErrors } = useContext(ErrorContext);

    const getCardSets = useCallback(async (headers = {}) => {
        const response = await fetch(`/api/sets`, {
            headers: {
                ...headers,
            },
        });

        const data = await response.json();

        switch (response.status) {
            case 200:
                setCardSets(data.card_sets);
                return;
            default:
                setErrors(data.errors);
                return;
        }
    }, []);

    return {
        getCardSets,
    };
}

export default useFetchCardSets;
