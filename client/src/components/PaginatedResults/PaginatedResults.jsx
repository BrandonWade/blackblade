import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import Paginator from '../../components/Paginator';
import CardGrid from '../CardGrid';
import './PaginatedResults.scss';

export default function PaginatedResults({
    forwardRef = null,
    className = '',
    paginatorClassName = '',
    gridClassName = '',
    onSelectResult = () => {},
    isLink = false,
    redirect = true,
    name = '',
    text = '',
    selectedTypes = [],
    colors = {},
    matchType = '',
    selectedSets = [],
    cmc = {},
    power = {},
    toughness = {},
    loyalty = {},
    rarities = {},
    flavorText = '',
    page = 1,
    setPage = () => {},
    totalResults = 0,
    setTotalResults = () => {},
    searchResults = [],
    setSearchResults = () => {},
    numberOfPages = 0,
    setNumberOfPages = () => {},
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
            displayResults(response, setSearchResults, setNumberOfPages, setTotalResults);
        }
    };

    const onPageChange = page => {
        setPage(page);
        fetchResults(page);

        if (forwardRef?.current) {
            forwardRef.current.scroll({ top: 0 });
        }
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
            <CardGrid gridClassName={gridClassName} cards={searchResults} isLink={isLink} onClick={onSelectResult} />
        </div>
    );
}
