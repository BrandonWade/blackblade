import React from 'react';
import './Checkbox.scss';

function Checkbox({ className = '', value = false, onClick = () => {}, children = [] }) {
    return (
        <label className={`Checkbox-label ${className}`} onClick={onClick}>
            {children}
            <span className={`Checkbox-checkmark ${value ? 'Checkbox--checked' : ''}`} />
        </label>
    );
}

export default Checkbox;
