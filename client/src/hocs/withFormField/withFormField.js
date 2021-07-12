import './withFormField.scss';

function withFormField(BaseComponent) {
    const FormField = props => {
        const { rowClassName = '', labelClassName = '', descriptionClassName = '', label = '', children = [], description = '' } = props;

        return (
            <div className={`FormField ${rowClassName}`}>
                {label && <label className={`FormField-label ${labelClassName}`}>{label}</label>}
                <BaseComponent {...props}>{children}</BaseComponent>
                {description && <p className={`FormField-description ${descriptionClassName}`}>{description}</p>}
            </div>
        );
    };

    return FormField;
}

export default withFormField;
