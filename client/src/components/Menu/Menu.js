import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import Overlay from '../Overlay';
import Button from '../Button';
import './Menu.scss';

function Menu({ menuOpen = false, setMenuOpen = () => {} }) {
    const { authenticated } = useContext(AuthContext);

    const openMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const renderDeckBuilderLink = () => {
        return authenticated ? (
            <li className='Menu-link' onClick={closeMenu}>
                <Link to='/decks/new'>Deck Builder</Link>
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
            <Overlay visible={menuOpen} setVisible={setMenuOpen}>
                <ul className='Menu-links'>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/advanced'>Advanced Search</Link>
                    </li>
                    {renderDeckBuilderLink()}
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/About'>About</Link>
                    </li>
                    {renderLoginLogoutLink()}
                </ul>
            </Overlay>
        </>
    );
}

export default Menu;
