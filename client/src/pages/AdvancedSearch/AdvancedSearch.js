import useDisplayResults from '../../hooks/useDisplayResults';
import HeaderPage from '../../components/HeaderPage';
import AttributeSearch from '../../components/AttributeSearch';
import './AdvancedSearch.scss';

export default function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();

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
            <AttributeSearch onSearch={onSearch} />
        </HeaderPage>
    );
}
