import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import useCardSets from '../../hooks/useCardSets';
import AttributeSearchContext from '../../contexts/AttributeSearch';
import { MultiSelectField } from '../../components/Select';

function CardSets({ loading = false, selectedSets = [], addSet = () => {}, removeSet = () => {} }) {
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
            loading={loading}
            rowClassName='AttributeSearch-formRow'
            labelClassName='AttributeSearch-label'
            className='AttributeSearch-select'
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

CardSets.propTypes = {
    loading: PropTypes.bool,
    selectedSets: PropTypes.array,
    addSet: PropTypes.func,
    removeSet: PropTypes.func,
};

export default CardSets;
