import { useState } from 'react';
import './withTooltip.scss';

function withTooltip(BaseComponent) {
    const Tooltip = props => {
        const [visible, setVisible] = useState(false);
        const { children = [], tooltipImage = '' } = props;

        const onMouseEnter = () => {
            setVisible(true);
        };

        const onMouseLeave = () => {
            setVisible(false);
        };

        return (
            <>
                <BaseComponent {...props} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {children}
                </BaseComponent>
                {visible ? (
                    <div className='Tooltip'>
                        <img className='Tooltip-image' src={tooltipImage} alt='' />
                    </div>
                ) : null}
            </>
        );
    };

    return Tooltip;
}

export default withTooltip;
