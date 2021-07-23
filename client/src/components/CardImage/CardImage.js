import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/Auth';
import useBookmarks from '../../hooks/useBookmarks';
import useMessage from '../../hooks/useMessage';
import BookmarkListContext from '../../contexts/BookmarkList';
import Button from '../Button';
import { RotateCW, RotateCCW, FlipRotate, StarEmpty, StarFilled } from '../Icons';
import './CardImage.scss';

function CardImage({ cardID = 0, cardFaces = [], layout = '' }) {
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
        const action = isBookmarked ? onRemoveBookmark : onCreateBookmark;
        const icon = isBookmarked ? <StarFilled className='CardImage-buttonIcon' /> : <StarEmpty className='CardImage-buttonIcon' />;
        const text = isBookmarked ? 'Remove Bookmark' : 'Add Bookmark';

        return (
            <Button className='CardImage-button' onClick={action}>
                {icon}
                {text}
            </Button>
        );
    };

    const renderTransformButton = () => {
        let action;
        let icon;
        let text;

        if (canFlip) {
            action = onFlip;
            icon = <FlipRotate className='CardImage-buttonIcon' />;
            text = 'Flip';
        } else if (canRotateCW) {
            action = onRotateCW;
            icon = <RotateCW className='CardImage-buttonIcon' />;
            text = 'Rotate';
        } else if (canRotateCCW) {
            action = onRotateCCW;
            icon = <RotateCCW className='CardImage-buttonIcon' />;
            text = 'Rotate';
        } else if (canTransform) {
            action = onTransform;
            icon = <FlipRotate className='CardImage-buttonIcon' />;
            text = 'Transform';
        }

        return (
            <Button className='CardImage-button' onClick={action}>
                {icon}
                {text}
            </Button>
        );
    };

    return (
        <div className='CardImage'>
            {front ? (
                <img
                    className={`CardImage-imageFront ${flipClassName} ${rotateCWClassName} ${rotateCCWClassName} ${transformClassName}`}
                    src={front.image}
                    alt={front.name}
                />
            ) : null}
            {canTransform && back ? <img className={`CardImage-imageBack ${transformBackClassName}`} src={back.image} alt={back.name} /> : null}
            <div className='CardImage-buttonContainer'>
                {renderBookmarkButton()}
                {renderTransformButton()}
            </div>
        </div>
    );
}

export default CardImage;
