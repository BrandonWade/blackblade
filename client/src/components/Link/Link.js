import { Link as InternalLink } from 'react-router-dom';
import './Link.scss';

export default function Link({ className = '', to = '', children = [] }) {
    const isInternal = to.indexOf('/') === 0;

    return isInternal ? (
        <InternalLink className={`Link ${className}`} to={to}>
            {children}
        </InternalLink>
    ) : (
        <a className={`Link ${className}`} href={to} target='_blank' rel='noreferrer'>
            {children}
        </a>
    );
}
