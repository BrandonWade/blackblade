import React from 'react';
import './Card.scss';

const Card = ({ children, className }) => {
    return <div className={`Card ${className}`}>{children}</div>;
};

export default Card;
