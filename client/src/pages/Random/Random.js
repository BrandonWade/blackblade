import { useEffect } from 'react';
import useRandomCard from '../../hooks/useRandomCard';
import HeaderPage from '../../components/HeaderPage';

function Random() {
    const { displayRandomCard } = useRandomCard();

    useEffect(() => {
        displayRandomCard();
    }, []);

    return <HeaderPage />;
}

export default Random;
