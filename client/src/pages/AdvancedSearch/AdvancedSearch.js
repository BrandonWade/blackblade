import React, { useContext, useEffect } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import useFetchCardSets from '../../hooks/useFetchCardSets';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';
import SearchContext from '../../contexts/Search';
import HeaderPage from '../../components/HeaderPage';
import { InputField } from '../../components/Input';
import { SelectField } from '../../components/Select';
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
        set,
        setSet,
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

    const onChangeSet = e => {
        setSet(e.target.value);
    };

    const onChangeFlavorText = e => {
        setFlavorText(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        searchResultsRedirect({ name, text, types, colors, matchType, set, cmc, power, toughness, loyalty, rarities, flavorText, page: 1 });
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
                    <SelectField
                        labelClassName='AdvancedSearch-label'
                        label='Set'
                        className='AdvancedSearch-select'
                        value={set}
                        onChange={onChangeSet}
                    >
                        <option value=''>Choose a card set</option>
                        {cardSets.map(s => (
                            <option key={s.id} value={s.set_code}>
                                {s.set_name}
                            </option>
                        ))}
                    </SelectField>
                    <StatRow
                        labelClassName='AdvancedSearch-label'
                        label='Power'
                        stat='power'
                        comparator={power.comparator}
                        value={power.value}
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
