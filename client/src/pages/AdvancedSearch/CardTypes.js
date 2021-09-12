import { useContext, useEffect } from 'react';
import useFetchCardTypes from '../../hooks/useFetchCardTypes';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import SearchContext from '../../contexts/Search';
import { MultiSelectField } from '../../components/Select';

export default function CardTypes() {
    const { getCardTypes } = useFetchCardTypes();
    const { cardTypes } = useContext(AdvancedSearchContext);
    const { selectedTypes, addType, removeType } = useContext(SearchContext);

    useEffect(() => {
        getCardTypes();
    }, [getCardTypes]);

    const onSelectType = e => {
        addType(e.target.value);
    };

    const onClearType = type => {
        removeType(type);
    };

    const getFormattedSelectedTypes = () => {
        return selectedTypes.reduce((types, cardType) => {
            const type = cardTypes.find(t => t.type === cardType);

            if (type) {
                return types.concat({
                    value: cardType,
                    text: cardType,
                });
            }

            return types;
        }, []);
    };

    const renderFilteredTypes = () => {
        const setOfSelectedTypes = new Set(selectedTypes);
        const filteredTypes = cardTypes.filter(t => !setOfSelectedTypes.has(t.type));

        return (
            <>
                <option value=''>Choose a card type</option>
                {filteredTypes.map(t => (
                    <option key={t.id} value={t.type}>
                        {t.type}
                    </option>
                ))}
            </>
        );
    };

    return (
        <MultiSelectField
            rowClassName='AdvancedSearch-formRow'
            labelClassName='AdvancedSearch-label'
            className='AdvancedSearch-select'
            descriptionClassName='AdvancedSearch-description'
            label='Types'
            isNegatable={true}
            description='Each card must contain all of the chosen types.'
            selectedOptions={getFormattedSelectedTypes()}
            onSelectOption={onSelectType}
            onClearOption={onClearType}
        >
            {renderFilteredTypes()}
        </MultiSelectField>
    );
}
