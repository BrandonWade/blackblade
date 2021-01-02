import React from 'react';
import './Checkbox.scss';

function Checkbox({ className = '', value = false, onClick = () => {}, children = [] }) {
    return (
        <label className={`Checkbox-label ${className}`} onClick={onClick}>
            <span className={`Checkbox-checkmark ${value ? 'Checkbox--checked' : ''}`} />
            {children}
        </label>
    );
}

export default Checkbox;
