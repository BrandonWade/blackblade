import LoadingSkeleton from '../../components/LoadingSkeleton';
import './withFormField.scss';

export default function withFormField(BaseComponent) {
    const FormField = props => {
        const {
            rowClassName = '',
            labelClassName = '',
            className = '',
            descriptionClassName = '',
            loading = false,
            label = '',
            children = [],
            description = '',
            actionButton = null,
        } = props;

        if (loading) {
            return (
                <div className={`FormField ${rowClassName}`}>
                    {label && <LoadingSkeleton className={`FormField-label--loading ${labelClassName}`} />}
                    <div className='FormField-verticalWrapper'>
                        <div className='FormField-horizontalWrapper'>
                            <BaseComponent {...props} loading={loading} className={`FormField-component--loading ${className}`} />
                        </div>
                        {description && <LoadingSkeleton className={`FormField-description--loading ${descriptionClassName}`} />}
                    </div>
                </div>
            );
        }

        return (
            <div className={`FormField ${rowClassName}`}>
                {label && <label className={`FormField-label ${labelClassName}`}>{label}</label>}
                <div className='FormField-verticalWrapper'>
                    <div className='FormField-horizontalWrapper'>
                        <BaseComponent {...props} className={`FormField-component ${className}`}>
                            {children}
                        </BaseComponent>
                        {actionButton}
                    </div>
                    {description && <p className={`FormField-description ${descriptionClassName}`}>{description}</p>}
                </div>
            </div>
        );
    };

    return FormField;
}
