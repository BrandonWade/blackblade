import { useContext } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import HeaderPage from '../../components/HeaderPage';
import AttributeSearch from '../../components/AttributeSearch';
import './AdvancedSearch.scss';

export default function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();
    const {
        name,
        setName,
        text,
        setText,
        selectedTypes,
        addType,
        removeType,
        negateType,
        colors,
        setColors,
        setColorless,
        matchType,
        setMatchType,
        selectedSets,
        addSet,
        removeSet,
        cmc,
        power,
        toughness,
        loyalty,
        setStat,
        rarities,
        setRarities,
        flavorText,
        setFlavorText,
        resetSearchCriteria,
    } = useContext(SearchContext);

    const onSearch = ({
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
        page = 1,
    }) => {
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
            page,
        });
    };

    return (
        <HeaderPage className='AdvancedSearch'>
            <AttributeSearch
                name={name}
                setName={setName}
                text={text}
                setText={setText}
                selectedTypes={selectedTypes}
                addType={addType}
                removeType={removeType}
                negateType={negateType}
                colors={colors}
                setColors={setColors}
                setColorless={setColorless}
                matchType={matchType}
                setMatchType={setMatchType}
                selectedSets={selectedSets}
                addSet={addSet}
                removeSet={removeSet}
                cmc={cmc}
                power={power}
                toughness={toughness}
                loyalty={loyalty}
                setStat={setStat}
                rarities={rarities}
                setRarities={setRarities}
                flavorText={flavorText}
                setFlavorText={setFlavorText}
                resetSearchCriteria={resetSearchCriteria}
                onSearch={onSearch}
            />
        </HeaderPage>
    );
}
