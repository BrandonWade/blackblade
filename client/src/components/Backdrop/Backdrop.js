import './Backdrop.scss';

function Backdrop({ className = '', visible = false, children = [] }) {
    return (
        <div className={`Backdrop ${className} ${visible ? '' : 'Backdrop--closed'}`}>
            <div className='Backdrop-shroud' />
            {children}
        </div>
    );
}

export default Backdrop;
