import './Link.scss';

function Link({ className = '', href = '', children = [] }) {
    return (
        <a className={`Link ${className}`} href={href}>
            {children}
        </a>
    );
}

export default Link;
