import PasswordInput from './PasswordInput';
import withFormField from '../../hocs/withFormField';

const PasswordInputFormField = withFormField(PasswordInput);

export default function PasswordInputField({
    hideStrength = false,
    label = '',
    value = '',
    rowClassName = '',
    labelClassName = '',
    className = '',
    ...rest
}) {
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
        <PasswordInputFormField
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
