import PropTypes from 'prop-types';
import './LoadingSkeleton.scss';

function LoadingSkeleton({ className = '' }) {
    return <div className={`LoadingSkeleton ${className}`} />;
}

LoadingSkeleton.propTypes = {
    className: PropTypes.string,
};

export default LoadingSkeleton;
