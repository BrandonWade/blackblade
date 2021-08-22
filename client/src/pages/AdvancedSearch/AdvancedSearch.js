import { useState, useContext } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import HeaderPage from '../../components/HeaderPage';
import { InputField } from '../../components/Input';
import Button from '../../components/Button';
import SymbolKey from '../../components/SymbolKey';
import CardTypes from './CardTypes';
import CardSets from './CardSets';
import ColorOptions from './ColorOptions';
import RarityOptions from './RarityOptions';
import StatRow from './StatRow';
import './AdvancedSearch.scss';

function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();
    const {
        name,
        setName,
        text,
        setText,
        selectedTypes,
        colors,
        matchType,
        selectedSets,
        cmc,
        power,
        toughness,
        loyalty,
        setStat,
        rarities,
        flavorText,
        setFlavorText,
    } = useContext(SearchContext);
    const [symbolKeyVisible, setSymbolKeyVisible] = useState(false);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeText = e => {
        setText(e.target.value);
    };

    const onShowSymbolKey = () => {
        setSymbolKeyVisible(true);
    };

    const onHideSymbolKey = () => {
        setSymbolKeyVisible(false);
    };

    const onInsertSymbols = symbols => {
        setText(`${text}${symbols}`);
    };

    const onChangeFlavorText = e => {
        setFlavorText(e.target.value);
    };

    const onSubmit = e => {
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

    return (
        <HeaderPage className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form' onSubmit={onSubmit}>
                    <SymbolKey visible={symbolKeyVisible} onInsertSymbols={onInsertSymbols} onClose={onHideSymbolKey} />
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
                        actionButton={
                            <Button className='AdvancedSearch-addSymbol' onClick={onShowSymbolKey}>
                                Add Symbol
                            </Button>
                        }
                    />
                    <CardTypes />
                    <ColorOptions labelClassName='AdvancedSearch-label' label='Colors' />
                    <CardSets />
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
                    <div className='AdvancedSearch-footer'>
                        <Button className='AdvancedSearch-searchButton' type='submit' onClick={onSubmit}>
                            Search
                        </Button>
                    </div>
                </form>
            </div>
        </HeaderPage>
    );
}

export default AdvancedSearch;
