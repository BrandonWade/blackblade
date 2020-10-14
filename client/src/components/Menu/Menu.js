import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './Menu.scss';

const Menu = () => {
    return (
        <>
            <Button className='Menu-button'>Menu</Button>
            <div className='Menu'>
                <div className='Menu-close'>
                    <span className='Menu-closeIcon'></span>
                </div>
                <ul className='Menu-links'>
                    <li className='Menu-link'>
                        <Link to='/advanced'>Advanced Search</Link>
                    </li>
                    <li className='Menu-link'>
                        <Link to='/decks'>Deck Builder</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Menu;
