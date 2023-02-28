import PropTypes from 'prop-types';
import withFormField from '../../hocs/withFormField';
import withMultiSelect from '../../hocs/withMultiSelect';
import LoadingSkeleton from '../LoadingSkeleton';
import './Select.scss';

function Select({ className = '', loading = false, children = [], value = '', multiple = false, onChange = () => {} }) {
    if (loading) {
        return <LoadingSkeleton className={`Select--loading ${className}`} />;
    }

    return (
        <select className={`Select ${className}`} value={value} multiple={multiple} onChange={onChange}>
            {children}
        </select>
    );
}

Select.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    value: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Select;

export const SelectField = withFormField(Select);
export const MultiSelectField = withFormField(withMultiSelect(Select));
