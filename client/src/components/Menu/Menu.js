import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import Button from '../Button';
import Backdrop from '../Backdrop';
import CloseButton from '../CloseButton';
import './Menu.scss';

function Menu({ menuOpen = false, setMenuOpen = () => {} }) {
    const { authenticated } = useContext(AuthContext);

    const openMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const renderMyDecksLink = () => {
        return authenticated ? (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/account/decks'>My Decks</Link>
            </li>
        ) : null;
    };

    const renderMyCardsLink = () => {
        return authenticated ? (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/account/cards'>My Cards</Link>
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
                <CloseButton className='Menu-closeButton' onClose={setMenuOpen} />
                <ul className='Menu-links'>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/advanced'>Advanced Search</Link>
                    </li>
                    {renderMyDecksLink()}
                    {renderMyCardsLink()}
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
