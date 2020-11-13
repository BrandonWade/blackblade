import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../useSearch';
import CardContext from '../../contexts/CardContext';

const useRandomCard = () => {
    const history = useHistory();
    const { getRandomCard } = useSearch();
    const { setCard } = useContext(CardContext);

    const displayRandomCard = async () => {
        const response = await getRandomCard();
        if (!response.success) {
            // TODO: Implement proper error handling
            console.error(response.errors);
            return;
        }

        setCard(response.results);
        history.push(response.redirect);
    };

    return {
        displayRandomCard,
    };
};

export default useRandomCard;