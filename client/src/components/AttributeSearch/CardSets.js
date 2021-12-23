import { useEffect, useContext } from 'react';
import useCardSets from '../../hooks/useCardSets';
import AttributeSearchContext from '../../contexts/AttributeSearch';
import { MultiSelectField } from '../../components/Select';

export default function CardSets({ selectedSets = [], addSet = () => {}, removeSet = () => {} }) {
    const { getCardSets } = useCardSets();
    const { cardSets, setCardSets } = useContext(AttributeSearchContext);

    useEffect(() => {
        const fetchCardSets = async () => {
            const response = await getCardSets();
            if (!response) {
                return;
            }

            setCardSets(response.cardSets);
        };
        fetchCardSets();
    }, []);

    const onSelectSet = e => {
        addSet(e.target.value);
    };

    const onClearSet = setCode => {
        removeSet(setCode);
    };

    const getFormattedSelectedSets = () => {
        return selectedSets.reduce((sets, setCode) => {
            const set = cardSets.find(s => s.set_code === setCode);

            if (set) {
                return sets.concat({
                    value: setCode,
                    text: set.set_name,
                });
            }

            return sets;
        }, []);
    };

    const renderFilteredSets = () => {
        const setOfSelectedSets = new Set(selectedSets);
        const filteredSets = cardSets.filter(s => !setOfSelectedSets.has(s.set_code));

        return (
            <>
                <option value=''>Choose a card set</option>
                {filteredSets.map(s => (
                    <option key={s.id} value={s.set_code}>
                        {s.set_name}
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
            label='Sets'
            description='Each card must be in one or more of the selected sets.'
            selectedOptions={getFormattedSelectedSets()}
            onSelectOption={onSelectSet}
            onClearOption={onClearSet}
        >
            {renderFilteredSets()}
        </MultiSelectField>
    );
}
