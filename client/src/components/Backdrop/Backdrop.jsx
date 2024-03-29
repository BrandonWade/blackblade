import { useEffect } from 'react';
import './Backdrop.scss';

export default function Backdrop({ className = '', visible = false, children = [], onClose = () => {}, closeOnClick = true }) {
    useEffect(() => {
        const onEscapePress = e => {
            if (e.keyCode === 27) {
                onClose();
            }
        };

        document.addEventListener('keydown', onEscapePress, false);

        return () => {
            document.removeEventListener('keydown', onEscapePress, false);
        };
    }, []);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [visible]);

    const onClick = () => {
        if (closeOnClick) {
            onClose();
        }
    };

    const stopClickPropagation = e => e.stopPropagation();

    return visible ? (
        <div className='Backdrop'>
            <div className='Backdrop-shroud' onClick={onClick} />
            <span className={`Backdrop-content ${className}`} onClick={stopClickPropagation}>
                {children}
            </span>
        </div>
    ) : null;
}
