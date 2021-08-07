import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import CardContext from '../../contexts/Card';
import HeaderPage from '../../components/HeaderPage';

function Random() {
    const history = useHistory();
    const { getRandomCard } = useSearch();
    const { setCard } = useContext(CardContext);

    useEffect(() => {
        const displayRandomCard = async () => {
            const response = await getRandomCard();
            if (!response.success) {
                return;
            }

            setCard(response.results);
            history.replace(response.redirect);
        };
        displayRandomCard();
    }, []);

    return <HeaderPage />;
}

export default Random;
