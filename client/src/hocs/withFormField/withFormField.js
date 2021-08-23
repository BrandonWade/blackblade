import './withFormField.scss';

function withFormField(BaseComponent) {
    const FormField = props => {
        const {
            rowClassName = '',
            labelClassName = '',
            className = '',
            descriptionClassName = '',
            label = '',
            children = [],
            description = '',
            actionButton = null,
        } = props;

        return (
            <div className={`FormField ${rowClassName}`}>
                {label && <label className={`FormField-label ${labelClassName}`}>{label}</label>}
                <div className='FormField-componentWrapper'>
                    <BaseComponent {...props} className={`FormField-component ${className}`}>
                        {children}
                    </BaseComponent>
                    {actionButton}
                </div>
                {description && <p className={`FormField-description ${descriptionClassName}`}>{description}</p>}
            </div>
        );
    };

    return FormField;
}

export default withFormField;
