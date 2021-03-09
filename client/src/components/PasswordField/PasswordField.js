import { InputField } from '../Input';
import './PasswordField.scss';

function PasswordField({ label = '', value = '', labelClassName = '', rowClassName = '', className = '', onChange = () => {} }) {
    const [inputClassName, descriptionClassName, description] = getDetails();

    function getDetails() {
        if (value.length < 15) {
            return ['PasswordField-input--weak', 'PasswordField-description--weak', 'Weak'];
        } else if (value.length < 25) {
            return ['PasswordField-input--okay', 'PasswordField-description--okay', 'Okay'];
        } else {
            return ['PasswordField-input--strong', 'PasswordField-description--strong', 'Strong'];
        }
    }

    return (
        <InputField
            type='password'
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
    );
}

export default PasswordField;
