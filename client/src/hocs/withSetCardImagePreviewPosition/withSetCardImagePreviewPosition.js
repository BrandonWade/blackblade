import { useRef, useContext } from 'react';
import CardImagePreviewContext from '../../contexts/CardImagePreview/CardImagePreview';
import './withSetCardImagePreviewPosition.scss';

function withImagePreview(BaseComponent) {
    const ImagePreview = ({ children = [], image = '', alt = '', ...rest }) => {
        const ref = useRef();
        const { setTop, setLeft, setImage, setVisible } = useContext(CardImagePreviewContext);

        // const [styles, setStyles] = useState({});

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

            // setStyles({
            //     top,
            //     left,
            // });
        };

        const onMouseLeave = () => {
            setVisible(false);
        };

        return (
            <>
                {visible ? (
                    <div className='ImagePreview' style={styles}>
                        <img className='ImagePreview-image' src={image} alt={alt} />
                    </div>
                ) : null}
                <BaseComponent {...rest} innerRef={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {children}
                </BaseComponent>
            </>
        );
    };

    return ImagePreview;
}

export default withImagePreview;
