import { useState, useEffect } from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import Button from '../Button';
import { RotateCW, RotateCCW, FlipRotate, Bookmark } from '../Icons';
import './CardImage.scss';

function CardImage({ cardID = 0, cardFaces = [], layout = '' }) {
    const { createBookmark } = useBookmarks();
    const [flipped, setFlipped] = useState(false);
    const [rotatedCW, setRotatedCW] = useState(false);
    const [rotatedCCW, setRotatedCCW] = useState(false);
    const [transformed, setTransformed] = useState(false);
    const canFlip = layout === 'flip';
    const canRotateCW = layout === 'split';
    const canRotateCCW = layout === 'aftermath';
    const canTransform = layout === 'transform' || layout === 'double_faced_token' || layout === 'modal_dfc';
    const flipClassName = `${canFlip ? 'CardImage--canFlip' : ''} ${flipped ? 'CardImage-imageFront--flipped' : ''}`;
    const rotateCWClassName = `${canRotateCW ? 'CardImage--canRotate' : ''} ${rotatedCW ? 'CardImage-imageFront--rotatedCW' : ''}`;
    const rotateCCWClassName = `${canRotateCCW ? 'CardImage--canRotate' : ''} ${rotatedCCW ? 'CardImage-imageFront--rotatedCCW' : ''}`;
    const transformClassName = `${canTransform ? 'CardImage--canTransform' : ''} ${transformed ? 'CardImage-imageFront--transformed' : ''}`;
    const transformBackClassName = `CardImage--canTransform ${transformed ? 'CardImage-imageBack--transformed' : ''}`;

    useEffect(() => {
        setFlipped(false);
        setRotatedCW(false);
        setRotatedCCW(false);
        setTransformed(false);
    }, [cardFaces]);

    const onCreateBookmark = () => {
        createBookmark(cardID);
    };

    const onFlip = () => {
        setFlipped(!flipped);
    };

    const onRotateCW = () => {
        setRotatedCW(!rotatedCW);
    };

    const onRotateCCW = () => {
        setRotatedCCW(!rotatedCCW);
    };

    const onTransform = () => {
        setTransformed(!transformed);
    };

    // TODO: Only display when logged in
    // TODO: Indicate when bookmark already exists
    const renderBookmarkButton = () => {
        return (
            <Button className='CardImage-button' onClick={onCreateBookmark}>
                <Bookmark className='CardImage-buttonIcon' />
                Bookmark
            </Button>
        );
    };

    const renderTransformButton = () => {
        if (canFlip) {
            return (
                <Button className='CardImage-button' onClick={onFlip}>
                    <FlipRotate className='CardImage-buttonIcon' />
                    Flip
                </Button>
            );
        } else if (canRotateCW) {
            return (
                <Button className='CardImage-button' onClick={onRotateCW}>
                    <RotateCW className='CardImage-buttonIcon' />
                    Rotate
                </Button>
            );
        } else if (canRotateCCW) {
            return (
                <Button className='CardImage-button' onClick={onRotateCCW}>
                    <RotateCCW className='CardImage-buttonIcon' />
                    Rotate
                </Button>
            );
        } else if (canTransform) {
            return (
                <Button className='CardImage-button' onClick={onTransform}>
                    <FlipRotate className='CardImage-buttonIcon' />
                    Transform
                </Button>
            );
        }

        return;
    };

    return (
        <div className='CardImage'>
            <img
                className={`CardImage-imageFront ${flipClassName} ${rotateCWClassName} ${rotateCCWClassName} ${transformClassName}`}
                src={cardFaces?.[0]?.image || ''}
                alt={cardFaces?.[0]?.name || ''}
            />
            {canTransform && (
                <img className={`CardImage-imageBack ${transformBackClassName}`} src={cardFaces?.[1]?.image || ''} alt={cardFaces?.[1]?.name || ''} />
            )}
            <div className='CardImage-buttonContainer'>
                {renderBookmarkButton()}
                {renderTransformButton()}
            </div>
        </div>
    );
}

export default CardImage;
