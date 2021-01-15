import React from 'react';
import withFormField from '../../hocs/withFormField';
import Select from '../../components/Select';
import { NumberInputField } from '../../components/NumberInput';

function StatRow({ stat = '', comparator = '==', value = 0, setStat = () => {} }) {
    const onChangeComparator = e => {
        setStat(stat, e.target.value, value);
    };

    const onChangeValue = e => {
        setStat(stat, comparator, e.target.value);
    };

    const onIncrement = () => {
        const val = parseInt(value) || 0;
        setStat(stat, comparator, val + 1);
    };

    const onDecrement = () => {
        const val = parseInt(value) || 0;
        setStat(stat, comparator, val - 1);
    };

    return (
        <div className='StatRow'>
            <Select className='AdvancedSearch-select' value={comparator} onChange={onChangeComparator}>
                <option value='=='>Equal to</option>
                <option value='!='>Not equal to</option>
                <option value='<'>Less than</option>
                <option value='<='>Less than or equal to</option>
                <option value='>'>Greater than</option>
                <option value='>='>Greater than or equal to</option>
            </Select>
            <NumberInputField
                className='AdvancedSearch-input AdvancedSearch-input--small'
                value={value}
                onChange={onChangeValue}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
            />
        </div>
    );
}

export default withFormField(StatRow);
