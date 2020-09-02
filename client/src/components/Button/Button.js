import React from 'react';
import './Button.scss';

const Button = ({ className = '', onClick = () => {}, disabled = false, children = [] }) => {
    return (
        <button className={`Button ${className}`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
