import React from 'react';
import './CardSection.scss';

const CardSection = ({ children, className }) => {
    return <div className={`CardSection ${className}`}>{children}</div>;
};

export default CardSection;
