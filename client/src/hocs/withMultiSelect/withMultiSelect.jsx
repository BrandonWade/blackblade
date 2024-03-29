import MultiSelectRow from './MultiSelectRow';
import './withMultiSelect.scss';

export default function withMultiSelect(Select) {
    const MultiSelect = props => {
        const {
            multiSelectClassName = '',
            isNegatable = false,
            children = [],
            selectedOptions = [],
            onSelectOption = () => {},
            onClearOption = () => {},
            onNegateOption = () => {},
        } = props;

        const renderSelectedOptions = () => {
            if (selectedOptions.length === 0) {
                return null;
            }

            return (
                <ul className='MultiSelect-list'>
                    {selectedOptions.map(o => (
                        <MultiSelectRow
                            key={o.value}
                            value={o.value}
                            isNegated={o.isNegated}
                            isNegatable={isNegatable}
                            onRemove={onClearOption}
                            onNegate={onNegateOption}
                        >
                            {o.text}
                        </MultiSelectRow>
                    ))}
                </ul>
            );
        };

        return (
            <div className={`MultiSelect ${multiSelectClassName}`}>
                <Select {...props} onChange={onSelectOption}>
                    {children}
                </Select>
                {renderSelectedOptions()}
            </div>
        );
    };

    return MultiSelect;
}
