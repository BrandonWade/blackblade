import { useContext, useEffect } from 'react';
import useCardTypes from '../../hooks/useCardTypes';
import AttributeSearchContext from '../../contexts/AttributeSearch';
import SearchContext from '../../contexts/Search';
import { MultiSelectField } from '../../components/Select';

export default function CardTypes() {
    const { getCardTypes } = useCardTypes();
    const { cardTypes, setCardTypes } = useContext(AttributeSearchContext);
    const { selectedTypes, addType, removeType, negateType } = useContext(SearchContext);

    useEffect(() => {
        const fetchCardTypes = async () => {
            const response = await getCardTypes();
            if (!response.success) {
                return;
            }

            setCardTypes(response.cardTypes);
        };
        fetchCardTypes();
    }, []);

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
            rowClassName='AttributeSearch-formRow'
            labelClassName='AttributeSearch-label'
            className='AttributeSearch-select'
            descriptionClassName='AttributeSearch-description'
            label='Types'
            isNegatable={true}
            description='Each card will contain all chosen types marked with IS, and will not contain any marked with NOT.'
            selectedOptions={getFormattedSelectedTypes()}
            onSelectOption={onSelectType}
            onClearOption={onClearType}
            onNegateOption={onNegateType}
        >
            {renderFilteredTypes()}
        </MultiSelectField>
    );
}
