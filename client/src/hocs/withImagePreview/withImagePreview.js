import { useState } from 'react';
import './withImagePreview.scss';

function withImagePreview(BaseComponent) {
    const ImagePreview = props => {
        const [visible, setVisible] = useState(false);
        const { children = [], image = '', alt = '' } = props;

        const onMouseEnter = () => {
            setVisible(true);
        };

        const onMouseLeave = () => {
            setVisible(false);
        };

        return (
            <>
                {visible ? (
                    <div className='ImagePreview'>
                        <img className='ImagePreview-image' src={image} alt={alt} />
                    </div>
                ) : null}
                <BaseComponent {...props} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {children}
                </BaseComponent>
            </>
        );
    };

    return ImagePreview;
}

export default withImagePreview;
