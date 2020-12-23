import React from 'react';
import Button from '../Button';
import './Overlay.scss';

function Overlay({ className = '', visible = false, setVisible = () => {}, children = [] }) {
    const closeOverlay = () => {
        setVisible(false);
    };

    return (
        <div className={`Overlay ${visible ? '' : 'Overlay--closed'} ${className}`}>
            <Button className='Overlay-closeButton' onClick={closeOverlay}>
                <span className='Overlay-closeIcon'></span>
            </Button>
            {children}
        </div>
    );
}

export default Overlay;
