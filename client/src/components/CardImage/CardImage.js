import React from 'react';
import './CardImage.scss';

const CardImage = ({ image, alt }) => <img src={image} alt={alt} className='CardImage' />;

export default CardImage;
