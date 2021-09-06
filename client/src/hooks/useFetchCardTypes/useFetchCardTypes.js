import { useContext, useCallback } from 'react';
import useFetch from '../useFetch';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';

export default function useFetchCardTypes() {
    const { fetchData } = useFetch();
    const { setCardTypes } = useContext(AdvancedSearchContext);

    const getCardTypes = useCallback(async () => {
        const response = await fetchData(`/api/types`);
        const data = await response.json();

        switch (response.status) {
            case 200:
                setCardTypes(data.card_types);
                return;
            default:
                return {
                    message: data.message,
                };
        }
    }, [fetchData, setCardTypes]);

    return {
        getCardTypes,
    };
}
