import { useRef, useContext } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview/CardImagePreview';
import useCSSVariableValue from '../../hooks/useCSSVariableValue';

function withSetCardImagePreviewPosition(BaseComponent) {
    return ({ children = [], image = '', ...rest }) => {
        const ref = useRef();
        const { setTop, setLeft, setImage, setVisible } = useContext(CardImagePreviewContext);
        const imageWidth = useCSSVariableValue('--card-image-preview-image-width');
        const imageHeight = useCSSVariableValue('--card-image-preview-image-height');

        const onMouseEnter = () => {
            const { x, y, height } = ref.current.getBoundingClientRect();

            const offsetX = imageWidth + 5; // add a small gap between preview and component
            const offsetY = imageHeight / 2 - height / 2; // to center vertically

            let top = y - offsetY;
            let left = x - offsetX;

            // TODO: Bound top and left with viewport

            setTop(top);
            setLeft(left);
            setImage(image); // TODO: Get image(s) from hovered link
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
