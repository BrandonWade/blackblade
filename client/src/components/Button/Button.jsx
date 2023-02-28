import PropTypes from 'prop-types';
import LoadingSkeleton from '../LoadingSkeleton';
import './Button.scss';

function Button({ className = '', loading = false, type = 'button', disabled = false, children = [], onClick = () => {} }) {
    if (loading) {
        return <LoadingSkeleton className='Button--loading' />;
    }

    return (
        <button className={`Button ${className}`} type={type} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['submit', 'reset', 'button']),
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    onClick: PropTypes.func,
};

export default Button;
