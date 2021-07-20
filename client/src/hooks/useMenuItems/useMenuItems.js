import { useContext } from 'react';
import AuthContext from '../../contexts/Auth';
import useRandomCard from '../../hooks/useRandomCard';

export default function useMenuItems() {
    const { authenticated } = useContext(AuthContext);
    const { displayRandomCard } = useRandomCard();

    return [
        {
            text: 'Home',
            to: '/',
            onClick: null,
            renderInHeader: false,
        },
        {
            text: 'Advanced Search',
            to: '/advanced',
            onClick: null,
            renderInHeader: true,
        },
        {
            text: 'Decks',
            to: '/decks',
            onClick: null,
            renderInHeader: authenticated,
        },
        {
            text: 'Bookmarks',
            to: '/bookmarks',
            onClick: null,
            renderInHeader: authenticated,
        },
        {
            text: 'Random Card',
            to: '/random',
            onClick: displayRandomCard,
            renderInHeader: true,
        },
        {
            text: 'About',
            to: '/about',
            onClick: null,
            renderInHeader: true,
        },
        {
            text: 'Login',
            to: '/login',
            onClick: null,
            renderInHeader: !authenticated,
        },
        {
            text: 'Logout',
            to: '/logout',
            onClick: null,
            renderInHeader: authenticated,
        },
    ];
}
