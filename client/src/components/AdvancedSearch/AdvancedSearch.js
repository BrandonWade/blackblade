import { useState, useContext } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import SearchContext from '../../contexts/Search';
import { InputField } from '../../components/Input';
import Button from '../../components/Button';
import SymbolKey from '../../components/SymbolKey';
import CardTypes from './CardTypes';
import CardSets from './CardSets';
import ColorOptions from './ColorOptions';
import RarityOptions from './RarityOptions';
import StatRow from './StatRow';
import './AdvancedSearch.scss';

export default function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();
    const { showConfirmDialog } = useConfirmDialog();
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
        resetSearchCriteria,
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

    const onResetClick = () => {
        showConfirmDialog('Are you sure you want to reset your search criteria?', resetSearchCriteria);
    };

    return (
        <div className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form' onSubmit={onSubmit}>
                    <SymbolKey visible={symbolKeyVisible} onInsertSymbols={onInsertSymbols} onClose={onHideSymbolKey} />
                    <InputField
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        className='AdvancedSearch-input'
                        descriptionClassName='AdvancedSearch-description'
                        label='Name'
                        value={name}
                        description='Any words that appear in the name of the card.'
                        onChange={onChangeName}
                    />
                    <InputField
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        className='AdvancedSearch-input'
                        descriptionClassName='AdvancedSearch-description'
                        label='Text'
                        value={text}
                        description='Any words or symbols that appear in the card text.'
                        onChange={onChangeText}
                        actionButton={
                            <Button className='AdvancedSearch-addSymbol' onClick={onShowSymbolKey}>
                                Add Symbol
                            </Button>
                        }
                    />
                    <CardTypes />
                    <ColorOptions labelClassName='AdvancedSearch-label' label='Colors' rowClassName='AdvancedSearch-formRow' />
                    <CardSets />
                    <StatRow
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        label='CMC'
                        stat='cmc'
                        comparator={cmc.comparator}
                        value={cmc.value}
                        setStat={setStat}
                    />
                    <StatRow
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        label='Power'
                        stat='power'
                        comparator={power.comparator}
                        value={power.value}
                        setStat={setStat}
                    />
                    <StatRow
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        label='Toughness'
                        stat='toughness'
                        comparator={toughness.comparator}
                        value={toughness.value}
                        setStat={setStat}
                    />
                    <StatRow
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        label='Loyalty'
                        stat='loyalty'
                        comparator={loyalty.comparator}
                        value={loyalty.value}
                        setStat={setStat}
                    />
                    <RarityOptions
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        descriptionClassName='AdvancedSearch-description'
                        label='Rarities'
                        description='Each card must be one or more of the selected rarities.'
                    />
                    <InputField
                        rowClassName='AdvancedSearch-formRow'
                        labelClassName='AdvancedSearch-label'
                        className='AdvancedSearch-input'
                        descriptionClassName='AdvancedSearch-description'
                        label='Flavor Text'
                        value={flavorText}
                        description='Any words that appear in the flavor text of the card.'
                        onChange={onChangeFlavorText}
                    />
                    <div className='AdvancedSearch-footer'>
                        <Button className='AdvancedSearch-searchButton' type='submit' onClick={onSubmit}>
                            Search
                        </Button>
                        <Button className='AdvancedSearch-resetButton' onClick={onResetClick}>
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
