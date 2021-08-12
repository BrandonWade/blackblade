import withFormField from '../../hocs/withFormField';
import './TextArea.scss';

function TextArea({ className = '', value = '', maxLength = undefined, readOnly = false, onChange = () => {} }) {
    const readOnlyClassName = readOnly ? 'TextArea--readOnly' : '';
    return (
        <textarea
            className={`TextArea ${readOnlyClassName} ${className}`}
            value={value}
            maxLength={maxLength}
            readOnly={readOnly}
            onChange={onChange}
        />
    );
}

export default TextArea;

export const TextAreaField = withFormField(TextArea);
