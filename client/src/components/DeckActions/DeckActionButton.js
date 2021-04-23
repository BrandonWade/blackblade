import { Link } from 'react-router-dom';

function DeckActionButton({ to = '', visible = true, children = [], onClick = () => {} }) {
    const renderButton = () => {
        return to !== '' ? (
            <Link to={to}>
                <div className='DeckActions-button'>{children}</div>
            </Link>
        ) : (
            <div className='DeckActions-button' onClick={onClick}>
                {children}
            </div>
        );
    };

    return visible ? renderButton() : null;
}

export default DeckActionButton;
