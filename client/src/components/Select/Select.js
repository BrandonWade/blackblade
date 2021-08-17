import withFormField from '../../hocs/withFormField';
import withMultiSelect from '../../hocs/withMultiSelect';
import './Select.scss';

function Select({ className = '', children = [], value = '', multiple = false, onChange = () => {} }) {
    return (
        <select className={`Select ${className}`} value={value} multiple={multiple} onChange={onChange}>
            {children}
        </select>
    );
}

export default Select;

export const SelectField = withFormField(Select);
export const MultiSelectField = withFormField(withMultiSelect(Select));
