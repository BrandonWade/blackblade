import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import useBookmarks from '../../hooks/useBookmarks';
import useMessage from '../../hooks/useMessage';
import BookmarkListContext from '../../contexts/BookmarkList';
import Button from '../Button';
import { RotateCW, RotateCCW, FlipRotate, StarEmpty, StarFilled } from '../Icons';
import './CardImage.scss';

function CardImage({ cardID = 0, cardFaces = [], layout = '', compact = false, isLink = false }) {
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

    const renderBookmarkButton = () => {
        if (!authenticated) {
            return null;
        }

        const isBookmarked = bookmarkList.some(b => b.card_id === cardID);
        const iconClassName = compact ? 'CardImage-compactButtonIcon' : 'CardImage-buttonIcon';
        const buttonClassName = compact ? 'CardImage-compactButtonLeft' : '';
        const action = isBookmarked ? onRemoveBookmark : onCreateBookmark;
        const icon = isBookmarked ? <StarFilled className={iconClassName} /> : <StarEmpty className={iconClassName} />;
        const text = isBookmarked ? 'Remove Bookmark' : 'Add Bookmark';

        return (
            <Button className={buttonClassName} onClick={action}>
                {icon}
                {compact ? null : text}
            </Button>
        );
    };

    const renderTransformButton = () => {
        const iconClassName = compact ? 'CardImage-compactButtonIcon' : 'CardImage-buttonIcon';
        const buttonClassName = compact ? 'CardImage-compactButtonRight' : '';
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
                {compact ? null : text}
            </Button>
        );
    };

    const renderImage = () => {
        const image = (
            <div className='CardImage'>
                {front ? (
                    <img
                        className={`CardImage-imageFront ${flipClassName} ${rotateCWClassName} ${rotateCCWClassName} ${transformClassName}`}
                        src={front.image}
                        alt={front.name}
                    />
                ) : null}
                {canTransform && back ? <img className={`CardImage-imageBack ${transformBackClassName}`} src={back.image} alt={back.name} /> : null}
                <div className={`CardImage-buttonContainer ${compact ? 'CardImage-buttonContainer--compact' : ''}`}>
                    {renderBookmarkButton()}
                    {renderTransformButton()}
                </div>
            </div>
        );

        if (isLink) {
            return <Link to={`/cards/${cardID}`}>{image}</Link>;
        }

        return image;
    };

    return renderImage();
}

export default CardImage;
