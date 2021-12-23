import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
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
    totalResults,
    searchResults,
    numberOfPages,
    setPage,
}) {
    const { searchCards } = useSearch();
    const { searchResultsRedirect, displayResults } = useDisplayResults();

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
