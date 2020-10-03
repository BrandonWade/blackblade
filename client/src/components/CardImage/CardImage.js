import React, { useState } from 'react';
import Button from '../Button';
import './CardImage.scss';

const CardImage = ({ cardFaces = [], layout = '' }) => {
    const [flipped, setFlipped] = useState(false);
    const [selectedFaceIndex, setSelectedFaceIndex] = useState(0);
    const image = cardFaces?.[selectedFaceIndex]?.image;
    const name = cardFaces?.[selectedFaceIndex]?.name;

    const renderButton = () => {
        if (['flip'].includes(layout)) {
            return (
                <Button className='CardImage-transformButton' onClick={() => setFlipped(!flipped)}>
                    Flip
                </Button>
            );
        }

        return;
    };

    return (
        <div className='CardImage'>
            <img className={`CardImage-image ${flipped ? 'CardImage-image--flipped' : ''}`} src={image} alt={name} />
            {renderButton()}
        </div>
    );
};

export default CardImage;
