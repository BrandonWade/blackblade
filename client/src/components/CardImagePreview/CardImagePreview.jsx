import { useState, useContext, useEffect } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import './CardImagePreview.scss';

export default function CardImagePreview() {
    const [styles, setStyles] = useState({});
    const { top, left, frontImage, backImage, visible } = useContext(CardImagePreviewContext);

    useEffect(() => {
        setStyles({
            top,
            left,
        });
    }, [top, left]);

    return visible ? (
        <div className='CardImagePreview' style={styles}>
            <img className='CardImagePreview-image' src={frontImage} alt='' />
            {backImage && <img className='CardImagePreview-image' src={backImage} alt='' />}
        </div>
    ) : null;
}
