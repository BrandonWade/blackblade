import React from 'react';
import withFormField from '../../hocs/withFormField';
import './Select.scss';

function Select({ className = '', children = [], value = '', onChange = () => {} }) {
    return (
        <select className={`Select ${className}`} value={value} onChange={onChange}>
            {children}
        </select>
    );
}

export default Select;

export const SelectField = withFormField(Select);
