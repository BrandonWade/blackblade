import { useState, useContext, useEffect } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import './CardImagePreview.scss';

function CardImagePreview() {
    const [styles, setStyles] = useState({});
    const { top, left, image, visible } = useContext(CardImagePreviewContext);

    useEffect(() => {
        setStyles({
            top,
            left,
        });
    }, [top, left]);

    return visible ? (
        <div className='CardImagePreview' style={styles}>
            <img className='CardImagePreview-image' src={image} alt='' />
        </div>
    ) : null;
}

export default CardImagePreview;
