import React from 'react';
import './Logo.scss';

const Logo = ({ size = 'small' }) => {
    const className = size == 'small' ? 'Logo--small' : 'Logo--large';
    return <span className={`Logo ${className}`}>Blackblade</span>;
};

export default Logo;
