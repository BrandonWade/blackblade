import React from 'react';
import { Link } from 'react-router-dom';
import Overlay from '../Overlay';
import Button from '../Button';
import './Menu.scss';

const Menu = ({ menuOpen = false, setMenuOpen = () => {} }) => {
    return (
        <>
            <Button className='Menu-openButton' onClick={() => setMenuOpen(true)}>
                <span className='Menu-openIcon' />
            </Button>
            <Overlay visible={menuOpen} setVisible={setMenuOpen}>
                <ul className='Menu-links'>
                    <li className='Menu-link' onClick={() => setMenuOpen(false)}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='Menu-link' onClick={() => setMenuOpen(false)}>
                        <Link to='/advanced'>Advanced Search</Link>
                    </li>
                    <li className='Menu-link' onClick={() => setMenuOpen(false)}>
                        <Link to='/decks'>Deck Builder</Link>
                    </li>
                    <li className='Menu-link' onClick={() => setMenuOpen(false)}>
                        <Link to='/About'>About</Link>
                    </li>
                </ul>
            </Overlay>
        </>
    );
};

export default Menu;
