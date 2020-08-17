import React from 'react';
import InputField from '../InputField';
import './Header.scss';

const Header = () => {
    return (
        <div className='Header'>
            <div className='Header-content'>
                <span className='Header-logo'>Blackblade</span>
                <InputField placeholder='Search' className='Header-searchBox' />
            </div>
        </div>
    );
};

export default Header;
