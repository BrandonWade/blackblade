import { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import DeckBuilderSearchContext from '../../contexts/DeckBuilderSearch';
import Paginator from '../../components/Paginator';
import BackgroundMessage, { NO_RESULTS } from '../../components/BackgroundMessage';
import CardGrid from '../CardGrid';
import './PaginatedResults.scss';

export default function PaginatedResults({
    className = '',
    paginatorClassName = '',
    gridClassName = '',
    onSelectResult = () => {},
    isLink = false,
    redirect = true,
    deckBuilderSearch = false,
}) {
    const {
        name: searchName,
        text: searchText,
        selectedTypes: searchSelectedTypes,
        colors: searchColors,
        matchType: searchMatchType,
        selectedSets: searchSelectedSets,
        cmc: searchCMC,
        power: searchPower,
        toughness: searchToughness,
        loyalty: searchLoyalty,
        rarities: searchRarities,
        flavorText: searchFlavorText,
        page: searchPage,
        totalResults: searchTotalResults,
        searchResults: searchSearchResults,
        numberOfPages: searchNumberOfPages,
        setPage: searchSetPage,
    } = useContext(SearchContext);
    const {
        name: deckBuilderSearchName,
        text: deckBuilderSearchText,
        selectedTypes: deckBuilderSearchSelectedTypes,
        colors: deckBuilderSearchColors,
        matchType: deckBuilderSearchMatchType,
        selectedSets: deckBuilderSearchSelectedSets,
        cmc: deckBuilderSearchCMC,
        power: deckBuilderSearchPower,
        toughness: deckBuilderSearchToughness,
        loyalty: deckBuilderSearchLoyalty,
        rarities: deckBuilderSearchRarities,
        flavorText: deckBuilderSearchFlavorText,
        page: deckBuilderSearchPage,
        totalResults: deckBuilderSearchTotalResults,
        searchResults: deckBuilderSearchSearchResults,
        numberOfPages: deckBuilderSearchNumberOfPages,
        setPage: deckBuilderSearchSetPage,
    } = useContext(DeckBuilderSearchContext);
    const { searchCards } = useSearch();
    const { searchResultsRedirect, displayResults } = useDisplayResults();
    const name = deckBuilderSearch ? deckBuilderSearchName : searchName;
    const text = deckBuilderSearch ? deckBuilderSearchText : searchText;
    const selectedTypes = deckBuilderSearch ? deckBuilderSearchSelectedTypes : searchSelectedTypes;
    const colors = deckBuilderSearch ? deckBuilderSearchColors : searchColors;
    const matchType = deckBuilderSearch ? deckBuilderSearchMatchType : searchMatchType;
    const selectedSets = deckBuilderSearch ? deckBuilderSearchSelectedSets : searchSelectedSets;
    const cmc = deckBuilderSearch ? deckBuilderSearchCMC : searchCMC;
    const power = deckBuilderSearch ? deckBuilderSearchPower : searchPower;
    const toughness = deckBuilderSearch ? deckBuilderSearchToughness : searchToughness;
    const loyalty = deckBuilderSearch ? deckBuilderSearchLoyalty : searchLoyalty;
    const rarities = deckBuilderSearch ? deckBuilderSearchRarities : searchRarities;
    const flavorText = deckBuilderSearch ? deckBuilderSearchFlavorText : searchFlavorText;
    const page = deckBuilderSearch ? deckBuilderSearchPage : searchPage;
    const totalResults = deckBuilderSearch ? deckBuilderSearchTotalResults : searchTotalResults;
    const searchResults = deckBuilderSearch ? deckBuilderSearchSearchResults : searchSearchResults;
    const numberOfPages = deckBuilderSearch ? deckBuilderSearchNumberOfPages : searchNumberOfPages;
    const setPage = deckBuilderSearch ? deckBuilderSearchSetPage : searchSetPage;

    const fetchResults = async (page = 1) => {
        if (redirect === true) {
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
        } else {
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
        }
    };

    const onPageChange = page => {
        setPage(page);
        fetchResults(page);
    };

    return (
        <div className={`PaginatedResults-content ${className}`}>
            <Paginator
                className={`PaginatedResults-paginator ${paginatorClassName}`}
                totalResults={totalResults}
                numberOfPages={numberOfPages}
                page={page}
                onPageChange={onPageChange}
            />
            <BackgroundMessage showMessage={searchResults.length === 0} type={NO_RESULTS}>
                <CardGrid gridClassName={gridClassName} cards={searchResults} isLink={isLink} onClick={onSelectResult} />
            </BackgroundMessage>
        </div>
    );
}
