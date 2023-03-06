import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useBookmarks from '../../hooks/useBookmarks';
import AuthContext from '../../contexts/Auth';
import BookmarkListContext from '../../contexts/BookmarkList';
import Button from '../Button';
import { RotateCW, RotateCCW, FlipRotate, StarEmpty, StarFilled } from '../Icons';
import LoadingSkeleton from '../LoadingSkeleton';
import './CardImage.scss';

function CardImage({
    className = '',
    imageClassName = '',
    loading = false,
    card = {},
    isSelected = false,
    isLink = false,
    isCompact = false,
    onClick = () => {},
}) {
    const cardID = card?.card_id;
    const name = card?.name;
    const setName = card?.set_name;
    const setCode = card?.set_code;
    const cardFaces = card?.faces_json;
    const layout = card?.layout;
    const { createBookmark, deleteBookmark } = useBookmarks();
    const { authenticated } = useContext(AuthContext);
    const { bookmarkList, setBookmarkList } = useContext(BookmarkListContext);
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
    const [front, back] = cardFaces || [];

    if (loading) {
        return <LoadingSkeleton className='CardImage--loading' />;
    }

    useEffect(() => {
        setFlipped(false);
        setRotatedCW(false);
        setRotatedCCW(false);
        setTransformed(false);
    }, [cardFaces]);

    const onCreateBookmark = async () => {
        const response = await createBookmark(cardID);
        if (!response.success) {
            return;
        }

        setBookmarkList(bookmarkList.concat(response.bookmark));
    };

    const onRemoveBookmark = async () => {
        const bookmark = bookmarkList.find(b => b.card_id === cardID);

        if (bookmark) {
            const response = await deleteBookmark(bookmark.id);
            if (!response.success) {
                return;
            }

            setBookmarkList(bookmarkList.filter(b => b.id !== bookmark.id));
        }
    };

    const onImageClick = e => {
        onClick(e, card);
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

    const countActions = () => {
        let numActions = 0;

        // Bookmark button
        if (authenticated) {
            numActions++;
        }

        // Transform button
        if (canFlip || canRotateCW || canRotateCCW || canTransform) {
            numActions++;
        }

        return numActions;
    };

    const renderImages = () => {
        const selectedClassName = isSelected ? 'CardGrid-selected' : '';

        const images = (
            <>
                {front ? (
                    <img
                        className={`CardImage-imageFront ${selectedClassName} ${imageClassName} ${flipClassName} ${rotateCWClassName} ${rotateCCWClassName} ${transformClassName}`}
                        src={front.image}
                        alt={front.name}
                        loading='lazy'
                    />
                ) : null}
                {canTransform && back ? (
                    <img
                        className={`CardImage-imageBack ${selectedClassName} ${imageClassName} ${transformBackClassName}`}
                        src={back.image}
                        alt={back.name}
                        loading='lazy'
                    />
                ) : null}
                <div className='CardImage-textContainer'>
                    <div className='CardImage-text'>{name}</div>
                    <div className='CardImage-text'>{setName}</div>
                    <div className='CardImage-text'>{setCode}</div>
                </div>
            </>
        );

        if (isLink) {
            return (
                <Link className='CardImage-link' to={`/cards/${cardID}`}>
                    {images}
                </Link>
            );
        }

        return (
            <div className={`CardImage-imageContainer ${className}`} onClick={onImageClick}>
                {images}
            </div>
        );
    };

    const renderBookmarkButton = () => {
        if (!authenticated) {
            return null;
        }

        const numActions = countActions();
        const isBookmarked = bookmarkList.some(b => b.card_id === cardID);
        const iconClassName = isCompact ? 'CardImage-buttonIcon--compact' : 'CardImage-buttonIcon';
        const buttonClassName = isCompact && numActions > 1 ? 'CardImage-button--compact' : 'CardImage-button';
        const action = isBookmarked ? onRemoveBookmark : onCreateBookmark;
        const icon = isBookmarked ? <StarFilled className={iconClassName} /> : <StarEmpty className={iconClassName} />;
        const text = isBookmarked ? 'Remove Bookmark' : 'Add Bookmark';

        return (
            <Button className={buttonClassName} onClick={action}>
                {icon}
                {isCompact ? null : text}
            </Button>
        );
    };

    const renderTransformButton = () => {
        if (!canFlip && !canRotateCW && !canRotateCCW && !canTransform) {
            return null;
        }

        const numActions = countActions();
        const iconClassName = isCompact ? 'CardImage-buttonIcon--compact' : 'CardImage-buttonIcon';
        const buttonClassName = isCompact && numActions > 1 ? 'CardImage-button--compact' : 'CardImage-button';
        let action;
        let icon;
        let text;

        if (canFlip) {
            action = onFlip;
            icon = <FlipRotate className={iconClassName} />;
            text = 'Flip';
        } else if (canRotateCW) {
            action = onRotateCW;
            icon = <RotateCW className={iconClassName} />;
            text = 'Rotate';
        } else if (canRotateCCW) {
            action = onRotateCCW;
            icon = <RotateCCW className={iconClassName} />;
            text = 'Rotate';
        } else if (canTransform) {
            action = onTransform;
            icon = <FlipRotate className={iconClassName} />;
            text = 'Transform';
        }

        return (
            <Button className={buttonClassName} onClick={action}>
                {icon}
                {isCompact ? null : text}
            </Button>
        );
    };

    return (
        <div className='CardImage'>
            {renderImages()}
            <div className={`CardImage-buttonContainer ${isCompact ? 'CardImage-buttonContainer--compact' : ''}`}>
                {renderBookmarkButton()}
                {renderTransformButton()}
            </div>
        </div>
    );
}

CardImage.propTypes = {
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    loading: PropTypes.bool,
    card: PropTypes.object,
    isSelected: PropTypes.bool,
    isLink: PropTypes.bool,
    isCompact: PropTypes.bool,
    onClick: PropTypes.func,
};

export default CardImage;
