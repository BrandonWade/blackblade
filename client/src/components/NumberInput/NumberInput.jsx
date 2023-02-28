import PropTypes from 'prop-types';
import withFormField from '../../hocs/withFormField';
import { ChevronThinDown, ChevronThinUp } from '../Icons';
import LoadingSkeleton from '../LoadingSkeleton';
import './NumberInput.scss';

function NumberInput({
    className = '',
    loading = false,
    placeholder = '',
    name = '',
    value = 0,
    onChange = () => {},
    onIncrement = () => {},
    onDecrement = () => {},
}) {
    if (loading) {
        return <LoadingSkeleton className={`NumberInput--loading ${className}`} />;
    }

    return (
        <span className='NumberInput-wrapper'>
            <input type='number' className={`NumberInput ${className}`} placeholder={placeholder} name={name} value={value} onChange={onChange} />
            <span className='NumberInput-buttons'>
                <span className='NumberInput-buttonWrapper NumberInput-increment' onClick={onIncrement}>
                    <ChevronThinUp />
                </span>
                <span className='NumberInput-buttonWrapper NumberInput-decrement' onClick={onDecrement}>
                    <ChevronThinDown />
                </span>
            </span>
        </span>
    );
}

NumberInput.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
};

export default NumberInput;

export const NumberInputField = withFormField(NumberInput);
