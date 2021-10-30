import useFetch from '../useFetch';

export default function useFetchCardSets() {
    const { fetchJSON } = useFetch();

    const getCardSets = async () => {
        const response = await fetchJSON(`/api/sets`);

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    cardSets: response.data.card_sets,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    return {
        getCardSets,
    };
}
