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
            renderOnHome: false,
        },
        {
            text: 'Advanced Search',
            to: '/advanced',
            renderInHeader: true,
            renderInPanelMenu: true,
            renderOnHome: true,
        },
        {
            text: 'Decks',
            to: '/decks',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
            renderOnHome: authenticated,
        },
        {
            text: 'Bookmarks',
            to: '/bookmarks',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
            renderOnHome: authenticated,
        },
        {
            text: 'Random Card',
            to: '/random',
            renderInHeader: true,
            renderInPanelMenu: false,
            renderOnHome: true,
        },
        {
            text: 'About',
            to: '/about',
            renderInHeader: true,
            renderInPanelMenu: true,
            renderOnHome: false,
        },
        {
            text: 'Account',
            to: '/account',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
            renderOnHome: false,
        },
        {
            text: 'Login',
            to: '/login',
            renderInHeader: !authenticated,
            renderInPanelMenu: !authenticated,
            renderOnHome: !authenticated,
        },
        {
            text: 'Logout',
            to: '/logout',
            renderInHeader: authenticated,
            renderInPanelMenu: authenticated,
            renderOnHome: false,
        },
    ];
}
