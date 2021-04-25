import './Backdrop.scss';

function Backdrop({ className = '', visible = false, children = [] }) {
    return visible ? (
        <div className='Backdrop'>
            <div className='Backdrop-shroud' />
            <div className={`Backdrop-content ${className}`}>{children}</div>
        </div>
    ) : null;
}

export default Backdrop;
