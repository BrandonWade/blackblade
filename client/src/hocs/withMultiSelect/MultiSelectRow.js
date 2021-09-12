import { useState } from 'react';
import Button from '../../components/Button';

export default function MultiSelectRow({ value = '', isNegatable = false, children = [], onRemove = () => {} }) {
    const [isNegated, setIsNegated] = useState(false);
    const negationText = isNegated ? 'NOT' : 'IS';
    const negationClass = isNegated ? 'MultiSelect-negationButton--negated' : 'MultiSelect-negationButton';

    const onRemoveRow = () => {
        onRemove(value);
    };

    const onToggleNegation = () => {
        setIsNegated(!isNegated);
    };

    const renderNegateButton = () => {
        if (!isNegatable) {
            return null;
        }

        return (
            <Button className={`MultiSelect-negationButton ${negationClass}`} onClick={onToggleNegation}>
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
