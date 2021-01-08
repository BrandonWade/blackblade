import React from 'react';
// import { difference } from 'lodash';
import './withMultiSelect.scss';

function withMultiSelect(Select) {
    const MultiSelect = props => {
        const { multiSelectClassName = '', children = [], selectedOptions = [], onSelectResult = () => {} } = props;

        const renderSelectedOptions = () => {
            if (selectedOptions.length === 0) {
                return null;
            }

            return (
                <ul>
                    {selectedOptions.map((option, i) => (
                        <li key={i}>{option}</li>
                    ))}
                </ul>
            );
        };

        // TODO: allow clearing sets

        return (
            <div className={`MultiSelect ${multiSelectClassName}`}>
                {renderSelectedOptions()}
                <Select {...props} onChange={onSelectResult}>
                    {}
                </Select>
            </div>
        );
    };

    return MultiSelect;
}

export default withMultiSelect;
