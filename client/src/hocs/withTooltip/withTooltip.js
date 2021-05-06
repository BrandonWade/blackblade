import './withTooltip.scss';

function withTooltip(BaseComponent) {
    return props => {
        const { tooltip = '', ...rest } = props;
        return (
            <span className='Tooltip' data-tooltip={tooltip}>
                <BaseComponent {...rest} />
            </span>
        );
    };
}

export default withTooltip;
