import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import useDeckBuilderTabs from '../../hooks/useDeckBuilderTabs';
import AttributeSearch from '../AttributeSearch';
import './DeckBuilderSearch.scss';

export default function DeckBuilderSearch() {
    const { searchCards } = useSearch();
    const { displayResults } = useDisplayResults();
    const { selectTabByID } = useDeckBuilderTabs();

    const onSearch = async ({
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
        displayResults(response, true);
        selectTabByID('search_results');
    };

    return (
        <div className='DeckBuilderSearch'>
            <AttributeSearch onSearch={onSearch} />
        </div>
    );
}
