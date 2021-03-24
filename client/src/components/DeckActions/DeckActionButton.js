import { Link } from 'react-router-dom';

function DeckActionButton({ to = '', visible = true, children = [] }) {
    return visible ? (
        <Link to={to}>
            <div className='DeckActions-button'>{children}</div>
        </Link>
    ) : null;
}

export default DeckActionButton;
