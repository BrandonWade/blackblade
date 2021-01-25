import { Link } from 'react-router-dom';
import './Logo.scss';

function Logo({ size = 'small', className = '' }) {
    const logoSize = size === 'small' ? 'Logo--small' : 'Logo--large';
    return (
        <span className={`Logo ${logoSize} ${className}`}>
            <Link to='/'>Blackblade</Link>
        </span>
    );
}

export default Logo;
