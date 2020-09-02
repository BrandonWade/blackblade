import React from 'react';
import './Input.scss';

const Input = ({ type = 'text', className = '', placeholder = '', value = '', onChange = () => {} }) => {
    return <input type={type} className={`Input ${className}`} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;
