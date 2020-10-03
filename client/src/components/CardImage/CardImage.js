import React, { useState, useEffect } from 'react';
import Button from '../Button';
import './CardImage.scss';

const CardImage = ({ cardFaces = [], layout = '' }) => {
    const [flipped, setFlipped] = useState(false);
    const [rotated, setRotated] = useState(false);
    const [transformed, setTransformed] = useState(false);
    const image = cardFaces?.[0]?.image;
    const name = cardFaces?.[0]?.name;
    const classNameFront = `${flipped ? 'CardImage-imageFront--flipped' : ''} ${rotated ? 'CardImage-imageFront--rotated' : ''} ${
        transformed ? 'CardImage-imageFront--transformed' : ''
    }`;
    const classNameBack = `${transformed ? 'CardImage-imageBack--transformed' : ''}`;
    const canFlip = layout === 'flip';
    const canRotate = layout === 'split';
    const canTransform = layout === 'transform' || layout === 'double_faced_token';

    useEffect(() => {
        setFlipped(false);
        setRotated(false);
        setTransformed(false);
    }, [cardFaces]);

    const renderButton = () => {
        if (canFlip) {
            return (
                <Button className='CardImage-button' onClick={() => setFlipped(!flipped)}>
                    Flip
                </Button>
            );
        } else if (canRotate) {
            return (
                <Button className='CardImage-button' onClick={() => setRotated(!rotated)}>
                    Rotate
                </Button>
            );
        } else if (canTransform) {
            return (
                <Button className='CardImage-button' onClick={() => setTransformed(!transformed)}>
                    Transform
                </Button>
            );
        }

        return;
    };

    return (
        <div className='CardImage'>
            <img className={`CardImage-imageFront ${classNameFront}`} src={image} alt={name} />
            {canTransform && <img className={`CardImage-imageBack ${classNameBack}`} src={cardFaces?.[1]?.image} alt={name} />}
            {renderButton()}
        </div>
    );
};

export default CardImage;
