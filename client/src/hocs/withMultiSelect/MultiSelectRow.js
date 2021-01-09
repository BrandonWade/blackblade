import React from 'react';

function MultiSelectRow({ value = '', children = [], onRemove = () => {} }) {
    const onRemoveRow = () => {
        onRemove(value);
    };

    return (
        <li className='MultiSelect-row'>
            <span className='MultiSelect-removeRow' onClick={onRemoveRow}>
                &#x2715;
            </span>
            {children}
        </li>
    );
}

export default MultiSelectRow;
