import { useState } from 'react';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import { InputField } from '../../components/Input';
import Button from '../../components/Button';
import SymbolKey from '../../components/SymbolKey';
import CardTypes from './CardTypes';
import CardSets from './CardSets';
import ColorOptions from './ColorOptions';
import RarityOptions from './RarityOptions';
import StatRow from './StatRow';
import './AttributeSearch.scss';

export default function AttributeSearch({
    name = '',
    setName = () => {},
    text = '',
    setText = () => {},
    selectedTypes = [],
    addType = () => {},
    removeType = () => {},
    negateType = () => {},
    colors = {},
    setColors = () => {},
    setColorless = () => {},
    matchType = '',
    setMatchType = () => {},
    selectedSets = [],
    addSet = () => {},
    removeSet = () => {},
    cmc = {},
    power = {},
    toughness = {},
    loyalty = {},
    setStat = () => {},
    rarities = {},
    setRarities = () => {},
    flavorText = '',
    setFlavorText = () => {},
    resetSearchCriteria = () => {},
    onSearch = () => {},
}) {
    const { showConfirmDialog } = useConfirmDialog();
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

        onSearch({
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
        });
    };

    const onResetClick = () => {
        showConfirmDialog('Are you sure you want to reset your search criteria?', resetSearchCriteria);
    };

    return (
        <div className='AttributeSearch'>
            <div className='AttributeSearch-content'>
                <form className='AttributeSearch-form' onSubmit={onSubmit}>
                    <SymbolKey visible={symbolKeyVisible} onInsertSymbols={onInsertSymbols} onClose={onHideSymbolKey} />
                    <InputField
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        className='AttributeSearch-input'
                        label='Name'
                        value={name}
                        description='Any words that appear in the name of the card.'
                        onChange={onChangeName}
                    />
                    <InputField
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        className='AttributeSearch-input'
                        label='Text'
                        value={text}
                        description='Any words or symbols that appear in the card text.'
                        onChange={onChangeText}
                        actionButton={
                            <Button className='AttributeSearch-addSymbol' onClick={onShowSymbolKey}>
                                Add Symbol
                            </Button>
                        }
                    />
                    <CardTypes selectedTypes={selectedTypes} addType={addType} removeType={removeType} negateType={negateType} />
                    <ColorOptions
                        labelClassName='AttributeSearch-label'
                        label='Colors'
                        rowClassName='AttributeSearch-formRow'
                        colors={colors}
                        setColors={setColors}
                        setColorless={setColorless}
                        matchType={matchType}
                        setMatchType={setMatchType}
                    />
                    <CardSets selectedSets={selectedSets} addSet={addSet} removeSet={removeSet} />
                    <StatRow
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        label='Mana Value'
                        stat='cmc'
                        comparator={cmc.comparator}
                        value={cmc.value}
                        setStat={setStat}
                    />
                    <StatRow
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        label='Power'
                        stat='power'
                        comparator={power.comparator}
                        value={power.value}
                        setStat={setStat}
                    />
                    <StatRow
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        label='Toughness'
                        stat='toughness'
                        comparator={toughness.comparator}
                        value={toughness.value}
                        setStat={setStat}
                    />
                    <StatRow
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        label='Loyalty'
                        stat='loyalty'
                        comparator={loyalty.comparator}
                        value={loyalty.value}
                        setStat={setStat}
                    />
                    <RarityOptions
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        label='Rarities'
                        description='Each card must be one or more of the selected rarities.'
                        rarities={rarities}
                        setRarities={setRarities}
                    />
                    <InputField
                        rowClassName='AttributeSearch-formRow'
                        labelClassName='AttributeSearch-label'
                        className='AttributeSearch-input'
                        label='Flavor Text'
                        value={flavorText}
                        description='Any words that appear in the flavor text of the card.'
                        onChange={onChangeFlavorText}
                    />
                    <div className='AttributeSearch-footer'>
                        <Button className='AttributeSearch-searchButton' type='submit' onClick={onSubmit}>
                            Search
                        </Button>
                        <Button className='AttributeSearch-resetButton' onClick={onResetClick}>
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
