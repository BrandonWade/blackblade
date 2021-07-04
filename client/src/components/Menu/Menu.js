import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import Button from '../Button';
import Backdrop from '../Backdrop';
import XButton from '../XButton';
import './Menu.scss';

function Menu({ menuOpen = false, setMenuOpen = () => {} }) {
    const { authenticated } = useContext(AuthContext);

    const openMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const renderDecksLink = () => {
        return authenticated ? (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/decks'>Decks</Link>
            </li>
        ) : null;
    };

    const renderBookmarksLink = () => {
        return authenticated ? (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/bookmarks'>Bookmarks</Link>
            </li>
        ) : null;
    };

    const renderLoginLogoutLink = () => {
        return authenticated ? (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/logout'>Logout</Link>
            </li>
        ) : (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/login'>Login</Link>
            </li>
        );
    };

    return (
        <>
            <Button className='Menu-openButton' onClick={openMenu}>
                <span className='Menu-openIcon' />
            </Button>
            <Backdrop className='Menu' visible={menuOpen}>
                <XButton className='Menu-closeButton' onClick={closeMenu} />
                <ul className='Menu-links'>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/advanced'>Advanced Search</Link>
                    </li>
                    {renderDecksLink()}
                    {renderBookmarksLink()}
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/About'>About</Link>
                    </li>
                    {renderLoginLogoutLink()}
                </ul>
            </Backdrop>
        </>
    );
}

export default Menu;
