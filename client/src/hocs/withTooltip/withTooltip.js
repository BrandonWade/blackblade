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
                {visible ? (
                    <div className='Tooltip'>
                        <img className='Tooltip-image' src={tooltipImage} alt='' />
                    </div>
                ) : null}
                <BaseComponent {...props} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {children}
                </BaseComponent>
            </>
        );
    };

    return Tooltip;
}

export default withTooltip;
