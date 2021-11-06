import { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import DeckBuilder from '../../contexts/DeckBuilder';
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
    deckBuilder = false,
}) {
    const {
        name: searchName,
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
        page: searchPage,
        totalResults: searchTotalResults,
        searchResults: searchSearchResults,
        numberOfPages: searchNumberOfPages,
        setPage: searchSetPage,
    } = useContext(SearchContext);
    const {
        name: deckBuilderName,
        page: deckBuilderPage,
        totalResults: deckBuilderTotalResults,
        searchResults: deckBuilderSearchResults,
        numberOfPages: deckBuilderNumberOfPages,
        setPage: setDeckBuilderPage,
    } = useContext(DeckBuilder);
    const { searchCards } = useSearch();
    const { searchResultsRedirect, displayResults } = useDisplayResults();
    const name = deckBuilder ? deckBuilderName : searchName;
    const page = deckBuilder ? deckBuilderPage : searchPage;
    const totalResults = deckBuilder ? deckBuilderTotalResults : searchTotalResults;
    const searchResults = deckBuilder ? deckBuilderSearchResults : searchSearchResults;
    const numberOfPages = deckBuilder ? deckBuilderNumberOfPages : searchNumberOfPages;
    const setPage = deckBuilder ? setDeckBuilderPage : searchSetPage;

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
            const response = await searchCards({ name, page });
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
