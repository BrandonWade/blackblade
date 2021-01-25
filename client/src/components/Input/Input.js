import withFormField from '../../hocs/withFormField';
import './Input.scss';

function Input({ type = 'text', className = '', placeholder = '', name = '', value = '', onChange = () => {} }) {
    return <input type={type} className={`Input ${className}`} placeholder={placeholder} name={name} value={value} onChange={onChange} />;
}

export default Input;

export const InputField = withFormField(Input);
