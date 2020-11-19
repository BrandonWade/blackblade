import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../useSearch';
import useErrors from '../useErrors';
import CardContext from '../../contexts/CardContext';

const useRandomCard = () => {
    const history = useHistory();
    const { getRandomCard } = useSearch();
    const { addErrors } = useErrors();
    const { setCard } = useContext(CardContext);

    const displayRandomCard = async () => {
        const response = await getRandomCard();
        if (!response.success) {
            addErrors(response.errors);
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
