import { Link as InternalLink } from 'react-router-dom';
import './Link.scss';

function renderInternalLink({ className = '', to = '', children = [] }) {
    return (
        <InternalLink className={`Link ${className}`} to={to}>
            {children}
        </InternalLink>
    );
}

function renderExternalLink({ className = '', to = '', children = [] }) {
    return (
        <a className={`Link ${className}`} href={to} target='_blank' rel='noreferrer'>
            {children}
        </a>
    );
}

function Link(props) {
    const isInternal = (props.to || '').indexOf('/') === 0;
    return isInternal ? renderInternalLink(props) : renderExternalLink(props);
}

export default Link;
