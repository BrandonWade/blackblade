import React from 'react';
import './Input.scss';

const Input = ({ type = 'text', className = '', placeholder = '', name = '', value = '', onChange = () => {} }) => {
    return <input type={type} className={`Input ${className}`} placeholder={placeholder} name={name} value={value} onChange={onChange} />;
};

export default Input;
