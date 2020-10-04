import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { RotateCW, Rotate, Flip } from '../Icons';
import './CardImage.scss';

const CardImage = ({ cardFaces = [], layout = '' }) => {
    const [flipped, setFlipped] = useState(false);
    const [rotated, setRotated] = useState(false);
    const [transformed, setTransformed] = useState(false);
    const canFlip = layout === 'flip';
    const canRotate = layout === 'split';
    const canTransform = layout === 'transform' || layout === 'double_faced_token';
    const flipClassName = `${canFlip ? 'CardImage--canFlip' : ''} ${flipped ? 'CardImage-imageFront--flipped' : ''}`;
    const rotateClassName = `${canRotate ? 'CardImage--canRotate' : ''} ${rotated ? 'CardImage-imageFront--rotated' : ''}`;
    const transformClassName = `${canTransform ? 'CardImage--canTransform' : ''} ${transformed ? 'CardImage-imageFront--transformed' : ''}`;
    const transformBackClassName = `CardImage--canTransform ${transformed ? 'CardImage-imageBack--transformed' : ''}`;

    useEffect(() => {
        setFlipped(false);
        setRotated(false);
        setTransformed(false);
    }, [cardFaces]);

    const renderButton = () => {
        if (canFlip) {
            return (
                <Button className='CardImage-button' onClick={() => setFlipped(!flipped)}>
                    <Flip className='CardImage-buttonIcon' />
                    Flip
                </Button>
            );
        } else if (canRotate) {
            return (
                <Button className='CardImage-button' onClick={() => setRotated(!rotated)}>
                    <RotateCW className='CardImage-buttonIcon' />
                    Rotate
                </Button>
            );
        } else if (canTransform) {
            return (
                <Button className='CardImage-button' onClick={() => setTransformed(!transformed)}>
                    <Rotate className='CardImage-buttonIcon' />
                    Transform
                </Button>
            );
        }

        return;
    };

    return (
        <div className='CardImage'>
            <img
                className={`CardImage-imageFront ${flipClassName} ${rotateClassName} ${transformClassName}`}
                src={cardFaces?.[0]?.image}
                alt={cardFaces?.[0]?.name}
            />
            {canTransform && (
                <img className={`CardImage-imageBack ${transformBackClassName}`} src={cardFaces?.[1]?.image} alt={cardFaces?.[1]?.name} />
            )}
            {renderButton()}
        </div>
    );
};

export default CardImage;
