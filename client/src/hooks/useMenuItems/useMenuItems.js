import { useContext } from 'react';
import AuthContext from '../../contexts/Auth';

export default function useMenuItems() {
    const { authenticated } = useContext(AuthContext);

    return [
        {
            text: 'Home',
            to: '/',
            renderInHeader: false,
            renderInPanelMenu: true,
        },
        {
            text: 'Advanced Search',
            to: '/advanced',
            renderInHeader: true,
            renderInPanelMenu: true,
        },
        {
            text: 'Decks',
            to: '/decks',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
        },
        {
            text: 'Bookmarks',
            to: '/bookmarks',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
        },
        {
            text: 'Random Card',
            to: '/random',
            renderInHeader: true,
            renderInPanelMenu: false,
        },
        {
            text: 'About',
            to: '/about',
            renderInHeader: true,
            renderInPanelMenu: true,
        },
        {
            text: 'Login',
            to: '/login',
            renderInHeader: !authenticated,
            renderInPanelMenu: !authenticated,
        },
        {
            text: 'Logout',
            to: '/logout',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
        },
    ];
}
