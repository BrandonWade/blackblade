import { useRef, useContext } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview/CardImagePreview';

function withSetCardImagePreviewPosition(BaseComponent) {
    return ({ children = [], image = '', ...rest }) => {
        const ref = useRef();
        const { setTop, setLeft, setImage, setVisible } = useContext(CardImagePreviewContext);

        const onMouseEnter = () => {
            const { x, y } = ref.current.getBoundingClientRect();

            // TODO: Calculate these using card dimentions
            const offsetX = 235; // card width plus padding (TODO: Calculate this)
            const offsetY = 125; // approximately half of card height

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
