import { useState } from 'react';
import { InputField } from '../Input';
import { Eye } from '../Icons';
import './PasswordField.scss';

function PasswordField({
    label = '',
    value = '',
    hideStrength = false,
    labelClassName = '',
    rowClassName = '',
    className = '',
    onChange = () => {},
}) {
    const [revealed, setRevealed] = useState(false);
    let [inputClassName, descriptionClassName, description] = getDetails();

    function getDetails() {
        if (hideStrength) {
            return [];
        } else if (value.length < 15) {
            return ['PasswordField-input--weak', 'PasswordField-description--weak', 'Weak'];
        } else if (value.length < 25) {
            return ['PasswordField-input--okay', 'PasswordField-description--okay', 'Okay'];
        } else {
            return ['PasswordField-input--strong', 'PasswordField-description--strong', 'Strong'];
        }
    }

    const toggleRevealed = () => {
        setRevealed(!revealed);
    };

    return (
        <div className='PasswordField-container'>
            <InputField
                type={revealed ? 'text' : 'password'}
                rowClassName={rowClassName}
                labelClassName={`PasswordField-label ${labelClassName}`}
                className={`PasswordField-input ${inputClassName} ${className}`}
                descriptionClassName={`PasswordField-description ${descriptionClassName}`}
                label={label}
                description={description}
                autoComplete='new-password'
                value={value}
                onChange={onChange}
            />
            <Eye className={`PasswordField-reveal ${hideStrength ? 'PasswordField-reveal--noDescription' : ''}`} onClick={toggleRevealed} />
        </div>
    );
}

export default PasswordField;
