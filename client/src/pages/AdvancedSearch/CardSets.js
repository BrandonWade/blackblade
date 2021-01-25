import { useEffect, useContext } from 'react';
import useFetchCardSets from '../../hooks/useFetchCardSets';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import SearchContext from '../../contexts/Search';
import { MultiSelectField } from '../../components/Select';

function CardTypes() {
    const { getCardSets } = useFetchCardSets();
    const { cardSets } = useContext(AdvancedSearchContext);
    const { selectedSets, addSet, removeSet } = useContext(SearchContext);

    useEffect(() => {
        getCardSets();
    }, [getCardSets]);

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
            labelClassName='AdvancedSearch-label'
            label='Sets'
            className='AdvancedSearch-select'
            selectedOptions={getFormattedSelectedSets()}
            onSelectOption={onSelectSet}
            onClearOption={onClearSet}
        >
            {renderFilteredSets()}
        </MultiSelectField>
    );
}

export default CardTypes;
