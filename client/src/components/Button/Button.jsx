import PropTypes from 'prop-types';
import LoadingSkeleton from '../LoadingSkeleton';
import './Button.scss';

function Button({ className = '', loading = false, children = [], type = 'button', disabled = false, onClick = () => {} }) {
    if (loading) {
        return <LoadingSkeleton className={`Button--loading ${className}`} />;
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
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    type: PropTypes.oneOf(['submit', 'reset', 'button']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
