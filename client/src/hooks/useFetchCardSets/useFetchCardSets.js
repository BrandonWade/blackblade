import { useContext, useCallback } from 'react';
import useFetch from '../useFetch';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';

function useFetchCardSets() {
    const { fetchData } = useFetch();
    const { setCardSets } = useContext(AdvancedSearchContext);

    const getCardSets = useCallback(async () => {
        const response = await fetchData(`/api/sets`);
        const data = await response.json();

        switch (response.status) {
            case 200:
                setCardSets(data.card_sets);
                return;
            default:
                return {
                    message: data.message,
                };
        }
    }, [fetchData, setCardSets]);

    return {
        getCardSets,
    };
}

export default useFetchCardSets;
