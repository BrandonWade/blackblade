import React from 'react';
import './CardImage.scss';

const CardImage = ({ image, alt }) => (
    <div className='CardImage'>
        <img className='CardImage-image' src={image} alt={alt} />
    </div>
);

export default CardImage;
