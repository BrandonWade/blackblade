import React from 'react';
import './InputField.scss';

const InputField = ({ type = 'text', className = '', placeholder = '', value = '', onChange = () => {} }) => {
    return <input type={type} className={`InputField ${className}`} value={value} onChange={onChange} />;
};

export default InputField;
