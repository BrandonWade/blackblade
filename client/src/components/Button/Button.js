import './Button.scss';

function Button({ className = '', type = 'button', disabled = false, children = [], onClick = () => {} }) {
    return (
        <button className={`Button ${className}`} type={type} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
