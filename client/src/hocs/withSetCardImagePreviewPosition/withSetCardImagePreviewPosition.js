import { useRef, useContext } from 'react';
import { uniq } from 'lodash';
import CardImagePreviewContext from '../../contexts/CardImagePreview/CardImagePreview';
import useCSSVariableValue from '../../hooks/useCSSVariableValue';

function withSetCardImagePreviewPosition(BaseComponent) {
    return ({ children = [], previewLocation = 'left', ...rest }) => {
        const ref = useRef();
        const { setTop, setLeft, setFrontImage, setBackImage, setVisible } = useContext(CardImagePreviewContext);
        const imageWidth = useCSSVariableValue('--card-image-preview-image-width');
        const imageHeight = useCSSVariableValue('--card-image-preview-image-height');

        const onMouseEnter = () => {
            const { x: baseX, y: baseY, height: componentHeight, width: componentWidth } = ref.current.getBoundingClientRect();
            const componentY = baseY + window.scrollY;
            const componentX = baseX + window.scrollX;
            const { previewImageFront, previewImageBack } = ref.current.dataset;
            const imageGap = 5;
            let offsetX;
            let offsetY;

            const images = uniq([previewImageFront, previewImageBack]).filter(i => i.length > 0);
            const totalImageWidth = imageWidth * images.length;
            const halfImageWidth = totalImageWidth / 2;
            const halfImageHeight = imageHeight / 2;

            if (previewLocation === 'left') {
                // Position to the left and center vertically
                offsetX = -(totalImageWidth + imageGap);
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
            const viewportWidth = document.body.scrollWidth;
            const viewportHeight = document.body.scrollHeight;
            const bottom = top + imageHeight;
            const right = left + totalImageWidth;

            // Bound the image vertically
            if (imageHeight < viewportHeight) {
                if (top < 0) {
                    top = 0;
                } else if (bottom > viewportHeight) {
                    top = viewportHeight - imageHeight;
                }
            }

            // Bound the image horizontally
            if (totalImageWidth < viewportWidth) {
                if (left < 0) {
                    left = 0;
                } else if (right > viewportWidth) {
                    left = viewportWidth - totalImageWidth;
                }
            }

            setTop(top);
            setLeft(left);
            setFrontImage(images[0]);
            setBackImage(images[1]);

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
