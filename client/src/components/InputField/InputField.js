import React from 'react';
import './InputField.scss';

const InputField = ({ type = 'text', className = '', placeholder = '' }) => {
    return <input type={type} className={`InputField ${className}`} />;
};

export default InputField;
