import withFormField from '../../hocs/withFormField';
import { ChevronThinDown, ChevronThinUp } from '../Icons';
import './NumberInput.scss';

function NumberInput({
    className = '',
    placeholder = '',
    name = '',
    value = 0,
    onChange = () => {},
    onIncrement = () => {},
    onDecrement = () => {},
}) {
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

export default NumberInput;

export const NumberInputField = withFormField(NumberInput);
