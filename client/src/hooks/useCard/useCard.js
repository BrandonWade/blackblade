import useFetch from '../useFetch';

function useCard() {
    const { fetchData } = useFetch();

    const listCards = async () => {
        const response = await fetchData('/api/cards');
        const data = await response.json();

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    cards: data.cards,
                };
            }
            case 401:
                return {
                    success: false,
                    message: data.message,
                };
            default: {
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    };

    const deleteCard = async (cardID = '') => {
        const response = await fetchData(`/api/cards/${cardID}`, 'DELETE');

        switch (response.status) {
            case 204:
                return {
                    success: true,
                };
            default:
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    return {
        listCards,
        deleteCard,
    };
}

export default useCard;
