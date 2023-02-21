import useFetch from '../useFetch';

export default function useCardTypes() {
    const { fetchJSON } = useFetch();

    const getCardTypes = async () => {
        const response = await fetchJSON(`/api/types`);

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    cardTypes: response.data.card_types,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    return {
        getCardTypes,
    };
}
