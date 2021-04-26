import './Backdrop.scss';

function Backdrop({ className = '', visible = false, children = [], onClick = () => {} }) {
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

export default Backdrop;
