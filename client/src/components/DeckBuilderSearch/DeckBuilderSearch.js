import { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import useDeckBuilderTabs from '../../hooks/useDeckBuilderTabs';
import DeckBuilderSearchContext from '../../contexts/DeckBuilderSearch';
import AttributeSearch from '../AttributeSearch';
import './DeckBuilderSearch.scss';

export default function DeckBuilderSearch() {
    const { searchCards } = useSearch();
    const { displayResults } = useDisplayResults();
    const { selectTabByID } = useDeckBuilderTabs();
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
        page,
        setPage,
        setSearchResults,
        setNumberOfPages,
        setTotalResults,
        resetSearchCriteria,
    } = useContext(DeckBuilderSearchContext);

    const onSearch = async () => {
        setName(name);
        setPage(1);

        const response = await searchCards({
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
        displayResults(response, setSearchResults, setNumberOfPages, setTotalResults);
        selectTabByID('search_results');
    };

    return (
        <div className='DeckBuilderSearch'>
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
        </div>
    );
}
