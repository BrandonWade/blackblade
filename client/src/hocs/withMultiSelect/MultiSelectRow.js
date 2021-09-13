import Button from '../../components/Button';

export default function MultiSelectRow({
    value = '',
    isNegated = false,
    isNegatable = false,
    children = [],
    onRemove = () => {},
    onNegate = () => {},
}) {
    const negationText = isNegated ? 'NOT' : 'IS';
    const negationClass = isNegated ? 'MultiSelect-negationButton--negated' : 'MultiSelect-negationButton';

    const onRemoveRow = () => {
        onRemove(value);
    };

    const onNegationClick = () => {
        onNegate(value);
    };

    const renderNegateButton = () => {
        if (!isNegatable) {
            return null;
        }

        return (
            <Button className={`MultiSelect-negationButton ${negationClass}`} onClick={onNegationClick}>
                {negationText}
            </Button>
        );
    };

    return (
        <li className='MultiSelect-row'>
            <span className='MultiSelect-removeRow' onClick={onRemoveRow}>
                &#x2715;
            </span>
            {renderNegateButton()}
            {children}
        </li>
    );
}
