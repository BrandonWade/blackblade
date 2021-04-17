import './Backdrop.scss';

function Backdrop({ className = '', visible = false, children = [] }) {
    return visible ? (
        <div className={`Backdrop ${className}`}>
            <div className='Backdrop-shroud' />
            {children}
        </div>
    ) : null;
}

export default Backdrop;
