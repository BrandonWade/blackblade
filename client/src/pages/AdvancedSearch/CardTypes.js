import { useContext, useEffect } from 'react';
import useFetchCardTypes from '../../hooks/useFetchCardTypes';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import SearchContext from '../../contexts/Search';
import { MultiSelectField } from '../../components/Select';

export default function CardTypes() {
    const { getCardTypes } = useFetchCardTypes();
    const { cardTypes } = useContext(AdvancedSearchContext);
    const { selectedTypes, addType, removeType, negateType } = useContext(SearchContext);

    useEffect(() => {
        getCardTypes();
    }, [getCardTypes]);

    const onSelectType = e => {
        addType(e.target.value);
    };

    const onClearType = type => {
        removeType(type);
    };

    const onNegateType = cardType => {
        negateType(cardType);
    };

    const getFormattedSelectedTypes = () => {
        return selectedTypes.reduce((formattedSelectedTypes, currentType) => {
            const type = cardTypes.find(t => t.type === currentType.type);

            if (type) {
                return formattedSelectedTypes.concat({
                    value: currentType.type,
                    text: currentType.type,
                    isNegated: currentType.isNegated,
                });
            }

            return formattedSelectedTypes;
        }, []);
    };

    const renderFilteredTypes = () => {
        const setOfSelectedTypes = new Set(selectedTypes.map(t => t.type));
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
            onNegateOption={onNegateType}
        >
            {renderFilteredTypes()}
        </MultiSelectField>
    );
}
