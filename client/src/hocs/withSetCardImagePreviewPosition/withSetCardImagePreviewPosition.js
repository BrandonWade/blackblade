import { useRef, useContext } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview/CardImagePreview';
import useCSSVariableValue from '../../hooks/useCSSVariableValue';

function withSetCardImagePreviewPosition(BaseComponent) {
    return ({ children = [], previewLocation = 'left', ...rest }) => {
        const ref = useRef();
        const { setTop, setLeft, setImage, setVisible } = useContext(CardImagePreviewContext);
        const imageWidth = useCSSVariableValue('--card-image-preview-image-width');
        const imageHeight = useCSSVariableValue('--card-image-preview-image-height');
        const halfImageWidth = imageWidth / 2;
        const halfImageHeight = imageHeight / 2;

        const onMouseEnter = () => {
            const { x: baseX, y: baseY, height: componentHeight, width: componentWidth } = ref.current.getBoundingClientRect();
            const componentY = baseY + window.scrollY;
            const componentX = baseX + window.scrollX;
            const { previewImage } = ref.current.dataset;
            const imageGap = 5;
            let offsetX;
            let offsetY;

            if (previewLocation === 'left') {
                // Position to the left and center vertically
                offsetX = -(imageWidth + imageGap);
                offsetY = -(halfImageHeight - componentHeight / 2);
            } else if (previewLocation === 'right') {
                // Position to the right and center vertically
                offsetX = componentWidth + imageGap;
                offsetY = -(halfImageHeight - componentHeight / 2);
            } else if (previewLocation === 'top') {
                // Position above and center horizontally
                offsetX = componentWidth / 2 - halfImageWidth;
                offsetY = -(imageHeight + imageGap);
            } else if (previewLocation === 'bottom') {
                // Position below and center horizontally
                offsetX = componentWidth / 2 - halfImageWidth;
                offsetY = componentHeight + imageGap;
            }

            // Calculate the "normal" top and left
            let top = componentY + offsetY;
            let left = componentX + offsetX;

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
