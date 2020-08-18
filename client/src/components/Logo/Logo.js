import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = ({ size = 'small' }) => {
    const className = size == 'small' ? 'Logo--small' : 'Logo--large';
    return (
        <span className={`Logo ${className}`}>
            <Link to='/'>Blackblade</Link>
        </span>
    );
};

export default Logo;
