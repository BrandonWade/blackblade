import { useRef, useContext } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview/CardImagePreview';
import useCSSVariableValue from '../../hooks/useCSSVariableValue';

function withSetCardImagePreviewPosition(BaseComponent) {
    return ({ children = [], ...rest }) => {
        const ref = useRef();
        const { setTop, setLeft, setImage, setVisible } = useContext(CardImagePreviewContext);
        const imageWidth = useCSSVariableValue('--card-image-preview-image-width');
        const imageHeight = useCSSVariableValue('--card-image-preview-image-height');
        const halfImageHeight = imageHeight / 2;

        const onMouseEnter = () => {
            const { x, y, height: componentHeight } = ref.current.getBoundingClientRect();
            const { previewImage } = ref.current.dataset;
            const offsetX = imageWidth + 5; // include a small gap between preview and component
            const offsetY = halfImageHeight - componentHeight / 2; // center vertically

            // Calculate the "normal" top and left
            let top = y - offsetY;
            let left = x - offsetX;

            // Bound the top and left if the preview doesn't fit in the viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const bottom = top + imageHeight;
            const right = left + imageWidth;

            // Bound the image vertically
            if (imageHeight < viewportHeight) {
                if (top < 0) {
                    top = 0;
                } else if (bottom > viewportHeight) {
                    top = viewportHeight - imageHeight;
                }
            }

            // Bound the image horizontally
            if (imageWidth < viewportWidth) {
                if (left < 0) {
                    left = 0;
                } else if (right > viewportWidth) {
                    left = viewportWidth - imageWidth;
                }
            }

            setTop(top);
            setLeft(left);
            setImage(previewImage);
            setVisible(true);
        };

        const onMouseLeave = () => {
            setVisible(false);
        };

        return (
            <BaseComponent {...rest} innerRef={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {children}
            </BaseComponent>
        );
    };
}

export default withSetCardImagePreviewPosition;
