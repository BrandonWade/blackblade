import withFormField from '../../hocs/withFormField';
import './Input.scss';

export default function Input({
    type = 'text',
    className = '',
    placeholder = '',
    name = '',
    value = '',
    maxLength = undefined,
    autoComplete = '',
    onChange = () => {},
}) {
    return (
        <input
            type={type}
            className={`Input ${className}`}
            placeholder={placeholder}
            name={name}
            value={value}
            maxLength={maxLength}
            autoComplete={autoComplete}
            onChange={onChange}
        />
    );
}

export const InputField = withFormField(Input);
