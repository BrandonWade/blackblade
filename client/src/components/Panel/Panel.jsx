import Logo from '../Logo';
import './Panel.scss';

export default function Panel({ wrapperClassName = '', className = '', showLogo = false, children = [] }) {
    return (
        <div className={`Panel-wrapper ${wrapperClassName}`}>
            {showLogo ? <Logo className='Panel-logo' size='large' /> : null}
            <div className={`Panel ${className}`}>{children}</div>
        </div>
    );
}
