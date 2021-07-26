import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBookmarks from '../../hooks/useBookmarks';
import useMessage from '../../hooks/useMessage';
import AuthContext from '../../contexts/Auth';
import BookmarkListContext from '../../contexts/BookmarkList';
import Button from '../Button';
import { RotateCW, RotateCCW, FlipRotate, StarEmpty, StarFilled } from '../Icons';
import './CardImage.scss';

function CardImage({
    imageClassName = '',
    cardID = 0,
    // TODO: Remove 'card' prop hack and use 'cardFaces' and 'layout' props instead
    card = {},
    _cardFaces = [], // TODO: Rename back to cardFaces
    _layout = '',
    isLink = false,
    isCompact = false,
    // TODO: Support onClick
    // TODO: Support selected
}) {
    const cardFaces = card?.sets_json?.[0]?.card_faces || card?.card_faces || _cardFaces || [];
    const layout = card?.layout || _layout || '';

    const { createBookmark, deleteBookmark } = useBookmarks();
    const { showMessage } = useMessage();
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
    const [front, back] = cardFaces;

    useEffect(() => {
        setFlipped(false);
        setRotatedCW(false);
        setRotatedCCW(false);
        setTransformed(false);
    }, [cardFaces]);

    const onCreateBookmark = async () => {
        const response = await createBookmark(cardID);
        if (!response?.success) {
            const { text, type } = response?.message;
            showMessage(text, type);
            return;
        }

        setBookmarkList(bookmarkList.concat(response.bookmark));
    };

    const onRemoveBookmark = async () => {
        const bookmark = bookmarkList.find(b => b.card_id === cardID);

        if (bookmark) {
            const response = await deleteBookmark(bookmark.id);
            if (!response?.success) {
                const { text, type } = response?.message;
                showMessage(text, type);
                return;
            }

            setBookmarkList(bookmarkList.filter(b => b.id !== bookmark.id));
        }
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
        const images = (
            <>
                {front ? (
                    <img
                        className={`CardImage-imageFront ${imageClassName} ${flipClassName} ${rotateCWClassName} ${rotateCCWClassName} ${transformClassName}`}
                        src={front.image}
                        alt={front.name}
                    />
                ) : null}
                {canTransform && back ? (
                    <img className={`CardImage-imageBack ${imageClassName} ${transformBackClassName}`} src={back.image} alt={back.name} />
                ) : null}
            </>
        );

        if (isLink) {
            return (
                <Link className='CardImage-imageContainer' to={`/cards/${cardID}`}>
                    {images}
                </Link>
            );
        }

        return <div className='CardImage-imageContainer'>{images}</div>;
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

export default CardImage;
