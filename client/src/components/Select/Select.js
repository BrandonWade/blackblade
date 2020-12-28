import React from 'react';
import './Select.scss';

function Select({ className = '', children = [], onChange = () => {} }) {
    return (
        <select className={`Select ${className}`} onChange={onChange}>
            {children}
        </select>
    );
}

export default Select;
