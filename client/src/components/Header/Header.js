import React from 'react';
import Logo from '../Logo';
import InputField from '../InputField';
import './Header.scss';

const Header = () => {
    return (
        <div className='Header'>
            <div className='Header-content'>
                <Logo />
                <InputField placeholder='Search' className='Header-searchBox' />
            </div>
        </div>
    );
};

export default Header;
