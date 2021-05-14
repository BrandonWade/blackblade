import Logo from '../Logo';
import './Panel.scss';

function Panel({ className = '', showLogo = false, children = [] }) {
    return (
        <div className='Panel-wrapper'>
            {showLogo ? <Logo size='large' /> : null}
            <div className={`Panel ${className}`}>{children}</div>
        </div>
    );
}

export default Panel;
