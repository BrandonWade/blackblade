import { useState, useRef } from 'react';
import './withImagePreview.scss';

function withImagePreview(BaseComponent) {
    const ImagePreview = ({ children = [], image = '', alt = '', ...rest }) => {
        const [visible, setVisible] = useState(false);
        const ref = useRef({ x: null, y: null });

        const onMouseEnter = e => {
            setVisible(true);
        };

        const onMouseLeave = e => {
            setVisible(false);
        };

        return (
            <>
                {visible ? (
                    <div className='ImagePreview'>
                        <img className='ImagePreview-image' src={image} alt={alt} />
                    </div>
                ) : null}
                <BaseComponent {...rest} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {children}
                </BaseComponent>
            </>
        );
    };

    return ImagePreview;
}

export default withImagePreview;
