import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <div className='Header'>
            <div className='Header-content'>
                <span className='Header-logo'>Blackblade</span>
                <input type='text' placeholder='Search' className='Header-searchBox' />
            </div>
        </div>
    );
};

export default Header;
