import React from 'react';
import './FieldGroup.scss';

function FieldGroup({ className = '', children = [] }) {
    return <div className={`FieldGroup ${className}`}>{children}</div>;
}

export default FieldGroup;
