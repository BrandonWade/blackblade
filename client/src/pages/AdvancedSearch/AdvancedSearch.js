import React, { useContext, useEffect } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import useFetchCardSets from '../../hooks/useFetchCardSets';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import SearchContext from '../../contexts/Search';
import HeaderPage from '../../components/HeaderPage';
import { InputField } from '../../components/Input';
import { MultiSelectField } from '../../components/Select';
import Button from '../../components/Button';
import ColorOptions from './ColorOptions';
import RarityOptions from './RarityOptions';
import StatRow from './StatRow';
import './AdvancedSearch.scss';

function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();
    const { getCardSets } = useFetchCardSets();
    const { cardSets } = useContext(AdvancedSearchContext);
    const {
        name,
        setName,
        text,
        setText,
        types,
        setTypes,
        colors,
        matchType,
        selectedSets,
        addSet,
        removeSet,
        cmc,
        power,
        toughness,
        loyalty,
        setStat,
        rarities,
        flavorText,
        setFlavorText,
    } = useContext(SearchContext);

    useEffect(() => {
        getCardSets();
    }, [getCardSets]);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeText = e => {
        setText(e.target.value);
    };

    const onChangeTypes = e => {
        setTypes(e.target.value);
    };

    const onSelectSet = e => {
        addSet({
            set_code: e.target.value,
            set_name: e.target.options[e.target.selectedIndex].text,
        });
    };

    const onClearSet = setCode => {
        removeSet(setCode);
    };

    const onChangeFlavorText = e => {
        setFlavorText(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        searchResultsRedirect({ name, text, types, colors, matchType, selectedSets, cmc, power, toughness, loyalty, rarities, flavorText, page: 1 });
    };

    const getSelectedSets = () => {
        return selectedSets.map(s => ({ value: s.set_code, text: s.set_name }));
    };

    const renderFilteredSets = () => {
        const setOfSelectedSets = new Set(selectedSets.map(s => s.set_code));
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
        <HeaderPage className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form' onSubmit={onSubmit}>
                    <InputField
                        labelClassName='AdvancedSearch-label'
                        label='Name'
                        className='AdvancedSearch-input'
                        value={name}
                        onChange={onChangeName}
                    />
                    <InputField
                        labelClassName='AdvancedSearch-label'
                        label='Text'
                        className='AdvancedSearch-input'
                        value={text}
                        onChange={onChangeText}
                    />
                    <InputField
                        labelClassName='AdvancedSearch-label'
                        label='Types'
                        className='AdvancedSearch-input'
                        value={types}
                        onChange={onChangeTypes}
                    />
                    <ColorOptions labelClassName='AdvancedSearch-label' label='Colors' />
                    <MultiSelectField
                        labelClassName='AdvancedSearch-label'
                        label='Sets'
                        className='AdvancedSearch-select'
                        selectedOptions={getSelectedSets()}
                        onSelectOption={onSelectSet}
                        onClearOption={onClearSet}
                    >
                        {renderFilteredSets()}
                    </MultiSelectField>
                    <StatRow
                        labelClassName='AdvancedSearch-label'
                        label='CMC'
                        stat='cmc'
                        comparator={cmc.comparator}
                        value={cmc.value}
                        setStat={setStat}
                    />
                    <StatRow
                        labelClassName='AdvancedSearch-label'
                        label='Power'
                        stat='power'
                        comparator={power.comparator}
                        value={power.value}
                        setStat={setStat}
                    />
                    <StatRow
                        labelClassName='AdvancedSearch-label'
                        label='Toughness'
                        stat='toughness'
                        comparator={toughness.comparator}
                        value={toughness.value}
                        setStat={setStat}
                    />
                    <StatRow
                        labelClassName='AdvancedSearch-label'
                        label='Loyalty'
                        stat='loyalty'
                        comparator={loyalty.comparator}
                        value={loyalty.value}
                        setStat={setStat}
                    />
                    <RarityOptions labelClassName='AdvancedSearch-label' label='Rarities' />
                    <InputField
                        labelClassName='AdvancedSearch-label'
                        label='Flavor Text'
                        className='AdvancedSearch-input'
                        value={flavorText}
                        onChange={onChangeFlavorText}
                    />
                    <Button className='AdvancedSearch-searchButton' onClick={onSubmit}>
                        Search
                    </Button>
                </form>
            </div>
        </HeaderPage>
    );
}

export default AdvancedSearch;
