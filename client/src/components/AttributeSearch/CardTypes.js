import { useContext, useEffect } from 'react';
import useCardTypes from '../../hooks/useCardTypes';
import AttributeSearchContext from '../../contexts/AttributeSearch';
import { MultiSelectField } from '../../components/Select';

export default function CardTypes({ selectedTypes = [], addType = () => {}, removeType = () => {}, negateType = () => {} }) {
    const { getCardTypes } = useCardTypes();
    const { cardTypes, setCardTypes } = useContext(AttributeSearchContext);

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
        const setOfCommonTypes = new Set(['Artifact', 'Creature', 'Enchantment', 'Instant', 'Land', 'Planeswalker', 'Sorcery', 'Tribal']);
        const commonTypeObjects = [];
        const remainingTypeObjects = [];

        cardTypes.forEach(cardType => {
            if (setOfSelectedTypes.has(cardType.type)) {
                return;
            }

            if (setOfCommonTypes.has(cardType.type)) {
                commonTypeObjects.push(cardType);
            } else {
                remainingTypeObjects.push(cardType);
            }
        });

        return (
            <>
                <option value=''>Choose a card type</option>
                <optgroup label='Common Types'>
                    {commonTypeObjects.map(t => (
                        <option key={t.id} value={t.type}>
                            {t.type}
                        </option>
                    ))}
                </optgroup>
                <optgroup label='Remaining Types'>
                    {remainingTypeObjects.map(t => (
                        <option key={t.id} value={t.type}>
                            {t.type}
                        </option>
                    ))}
                </optgroup>
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
