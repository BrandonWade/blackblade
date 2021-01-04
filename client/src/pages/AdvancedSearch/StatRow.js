import React from 'react';
import withFormField from '../../hocs/withFormField';
import Input from '../../components/Input';
import Select from '../../components/Select';

function StatRow({ stat = '', comparator = '==', value = '', setStat = () => {} }) {
    const onChangeComparator = e => {
        setStat(stat, e.target.value, value);
    };

    const onChangeValue = e => {
        setStat(stat, comparator, e.target.value);
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
            <Input className='AdvancedSearch-input AdvancedSearch-input--small' type='text' value={value} onChange={onChangeValue} />
        </div>
    );
}

export default withFormField(StatRow);
