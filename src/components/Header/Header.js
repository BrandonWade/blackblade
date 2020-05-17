import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='header__content'>
                <span className='header__logo'>Blackblade</span>
                <input type='text' placeholder='Search' className='header__search-box' />
            </div>
        </div>
    );
};

export default Header;
