import { useState } from 'react';
import Input from '../Input';
import { Block, Eye } from '../Icons';
import withFormField from '../../hocs/withFormField';
import './PasswordInput.scss';

function PasswordInput({ value = '', className = '', autoComplete = '', onChange = () => {} }) {
    const [revealed, setRevealed] = useState(false);

    const toggleRevealed = () => {
        setRevealed(!revealed);
    };

    const renderRevealIcon = () => {
        return revealed ? (
            <Block className={`PasswordInput-reveal`} onClick={toggleRevealed} />
        ) : (
            <Eye className={`PasswordInput-reveal`} onClick={toggleRevealed} />
        );
    };

    return (
        <span className='PasswordInput-container'>
            <Input
                type={revealed ? 'text' : 'password'}
                className={`PasswordInput-input ${className}`}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
            />
            {renderRevealIcon()}
        </span>
    );
}

export default PasswordInput;

const PasswordInputWithFormField = withFormField(PasswordInput);

export function PasswordField({ hideStrength = false, label = '', value = '', rowClassName = '', labelClassName = '', className = '', ...rest }) {
    const [inputClassName, descriptionClassName, description] = getDetails();

    function getDetails() {
        if (hideStrength) {
            return ['', '', ''];
        } else if (value.trim().length === 0) {
            return ['PasswordInput-input--empty', 'PasswordInput-description--empty', ' '];
        } else if (value.trim().length < 15) {
            return ['PasswordInput-input--weak', 'PasswordInput-description--weak', 'Weak'];
        } else if (value.trim().length < 25) {
            return ['PasswordInput-input--okay', 'PasswordInput-description--okay', 'Okay'];
        } else {
            return ['PasswordInput-input--strong', 'PasswordInput-description--strong', 'Strong'];
        }
    }

    return (
        <PasswordInputWithFormField
            {...rest}
            rowClassName={rowClassName}
            labelClassName={`PasswordInput-label ${labelClassName}`}
            className={`${inputClassName} ${className}`}
            descriptionClassName={`PasswordInput-description ${descriptionClassName}`}
            label={label}
            value={value}
            description={description}
        />
    );
}
