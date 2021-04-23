import './TextArea.scss';

function TextArea({ className = '', value = '', readOnly = false }) {
    return <textarea className={`TextArea ${className}`} value={value} readOnly={readOnly} />;
}

export default TextArea;
