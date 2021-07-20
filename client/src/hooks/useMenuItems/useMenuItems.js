import { useContext } from 'react';
import AuthContext from '../../contexts/Auth';

export default function useMenuItems() {
    const { authenticated } = useContext(AuthContext);

    return [
        {
            text: 'Home',
            to: '/',
            renderInHeader: false,
        },
        {
            text: 'Advanced Search',
            to: '/advanced',
            renderInHeader: true,
        },
        {
            text: 'Decks',
            to: '/decks',
            renderInHeader: authenticated,
        },
        {
            text: 'Bookmarks',
            to: '/bookmarks',
            renderInHeader: authenticated,
        },
        {
            text: 'Random Card',
            to: '/random',
            renderInHeader: true,
        },
        {
            text: 'About',
            to: '/about',
            renderInHeader: true,
        },
        {
            text: 'Login',
            to: '/login',
            renderInHeader: !authenticated,
        },
        {
            text: 'Logout',
            to: '/logout',
            renderInHeader: authenticated,
        },
    ];
}
