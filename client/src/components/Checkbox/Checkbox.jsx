import PropTypes from 'prop-types';
import LoadingSkeleton from '../LoadingSkeleton';
import './Checkbox.scss';

function Checkbox({ className = '', loading = false, children = [], value = false, onClick = () => {} }) {
    if (loading) {
        return <LoadingSkeleton className={`Checkbox--loading ${className}`} />;
    }

    return (
        <label className={`Checkbox-label ${className}`} onClick={onClick}>
            <span className={`Checkbox-checkmark ${value ? 'Checkbox--checked' : ''}`} />
            {children}
        </label>
    );
}

Checkbox.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    value: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Checkbox;
