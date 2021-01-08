import React from 'react';
import './withMultiSelect.scss';

function withMultiSelect(Select) {
    const MultiSelect = props => {
        const { multiSelectClassName = '', children = [], selectedOptions = [], onSelectOption = () => {} } = props;

        const renderSelectedOptions = () => {
            if (selectedOptions.length === 0) {
                return null;
            }

            return (
                <ul>
                    {selectedOptions.map(option => (
                        <li key={option}>{option}</li>
                    ))}
                </ul>
            );
        };

        // TODO: Add support for clearing selected options

        return (
            <div className={`MultiSelect ${multiSelectClassName}`}>
                {renderSelectedOptions()}
                <Select {...props} onChange={onSelectOption}>
                    {children}
                </Select>
            </div>
        );
    };

    return MultiSelect;
}

export default withMultiSelect;
