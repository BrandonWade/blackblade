import { useState } from 'react';
import CardImagePreviewContext, { initialState } from '../../contexts/CardImagePreview';

function CardImagePreviewProvider({ children = [] }) {
    const [top, setTop] = useState(initialState.top);
    const [left, setLeft] = useState(initialState.left);
    const [image, setImage] = useState(initialState.image);
    const [visible, setVisible] = useState(initialState.visible);

    const props = {
        top,
        left,
        image,
        visible,
        setTop,
        setLeft,
        setImage,
        setVisible,
    };

    return <CardImagePreviewContext.Provider value={props}>{children}</CardImagePreviewContext.Provider>;
}

export default CardImagePreviewProvider;
