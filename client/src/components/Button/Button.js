import './Button.scss';

function Button({ className = '', onClick = () => {}, disabled = false, children = [] }) {
    return (
        <button className={`Button ${className}`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
