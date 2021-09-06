import { useState } from 'react';
import CardImagePreviewContext, { initialState } from '../../contexts/CardImagePreview';

export default function CardImagePreviewProvider({ children = [] }) {
    const [top, setTop] = useState(initialState.top);
    const [left, setLeft] = useState(initialState.left);
    const [frontImage, setFrontImage] = useState(initialState.frontImage);
    const [backImage, setBackImage] = useState(initialState.backImage);
    const [visible, setVisible] = useState(initialState.visible);

    const props = {
        top,
        left,
        frontImage,
        backImage,
        visible,
        setTop,
        setLeft,
        setFrontImage,
        setBackImage,
        setVisible,
    };

    return <CardImagePreviewContext.Provider value={props}>{children}</CardImagePreviewContext.Provider>;
}
