import { Link } from 'react-router-dom';
import Overlay from '../Overlay';
import Button from '../Button';
import './Menu.scss';

function Menu({ menuOpen = false, setMenuOpen = () => {} }) {
    const openMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
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
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/decks'>Deck Builder</Link>
                    </li>
                    <li className='Menu-link' onClick={closeMenu}>
                        <Link to='/About'>About</Link>
                    </li>
                </ul>
            </Overlay>
        </>
    );
}

export default Menu;
