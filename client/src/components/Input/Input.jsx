import PropTypes from 'prop-types';
import withFormField from '../../hocs/withFormField';
import LoadingSkeleton from '../LoadingSkeleton';
import './Input.scss';

function Input({
    className = '',
    loading = false,
    type = 'text',
    placeholder = '',
    name = '',
    value = '',
    maxLength = undefined,
    autoComplete = '',
    onChange = () => {},
}) {
    if (loading) {
        return <LoadingSkeleton className={`Input--loading ${className}`} />;
    }

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

Input.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxLength: PropTypes.number,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
};

export default Input;

export const InputField = withFormField(Input);
