import { useContext, useCallback } from 'react';
import useFetch from '../useFetch';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import ErrorContext from '../../contexts/Error';

function useFetchCardTypes() {
    const { fetchData } = useFetch();
    const { setCardTypes } = useContext(AdvancedSearchContext);
    const { setErrors } = useContext(ErrorContext);

    const getCardTypes = useCallback(async () => {
        const response = await fetchData(`/api/types`);
        const data = await response.json();

        switch (response.status) {
            case 200:
                setCardTypes(data.card_types);
                return;
            default:
                setErrors(data.errors);
                return;
        }
    }, [fetchData, setCardTypes, setErrors]);

    return {
        getCardTypes,
    };
}

export default useFetchCardTypes;
