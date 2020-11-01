import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './Menu.scss';

const Menu = ({ menuOpen = false, setMenuOpen = () => {} }) => {
    return (
        <>
            <Button className='Menu-openButton' onClick={() => setMenuOpen(true)}>
                <span className='Menu-openIcon' />
            </Button>
            <div className={`Menu ${menuOpen ? '' : 'Menu--closed'}`}>
                <Button className='Menu-closeButton' onClick={() => setMenuOpen(false)}>
                    <span className='Menu-closeIcon'></span>
                </Button>
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
            </div>
        </>
    );
};

export default Menu;
