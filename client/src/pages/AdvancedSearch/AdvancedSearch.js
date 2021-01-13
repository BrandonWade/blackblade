import React, { useContext, useEffect } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import useFetchCardTypes from '../../hooks/useFetchCardTypes';
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
    const { getCardTypes } = useFetchCardTypes();
    const { getCardSets } = useFetchCardSets();
    const { cardTypes, cardSets } = useContext(AdvancedSearchContext);
    const {
        name,
        setName,
        text,
        setText,
        selectedTypes,
        addType,
        removeType,
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
        getCardTypes();
        getCardSets();
    }, [getCardTypes, getCardSets]);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeText = e => {
        setText(e.target.value);
    };

    const onSelectType = e => {
        addType(e.target.value);
    };

    const onClearType = type => {
        removeType(type);
    };

    const onSelectSet = e => {
        addSet(e.target.value);
    };

    const onClearSet = setCode => {
        removeSet(setCode);
    };

    const onChangeFlavorText = e => {
        setFlavorText(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        searchResultsRedirect({
            name,
            text,
            selectedTypes,
            colors,
            matchType,
            selectedSets,
            cmc,
            power,
            toughness,
            loyalty,
            rarities,
            flavorText,
            page: 1,
        });
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
                    <MultiSelectField
                        labelClassName='AdvancedSearch-label'
                        label='Types'
                        className='AdvancedSearch-select'
                        selectedOptions={getFormattedSelectedTypes()}
                        onSelectOption={onSelectType}
                        onClearOption={onClearType}
                    >
                        {renderFilteredTypes()}
                    </MultiSelectField>
                    <ColorOptions labelClassName='AdvancedSearch-label' label='Colors' />
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
