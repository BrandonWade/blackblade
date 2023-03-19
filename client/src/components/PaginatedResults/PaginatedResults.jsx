import PropTypes from 'prop-types';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import Paginator from '../../components/Paginator';
import CardGrid from '../CardGrid';
import './PaginatedResults.scss';

function PaginatedResults({
    forwardRef = null,
    loading = false,
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
                loading={loading}
                className={`PaginatedResults-paginator ${paginatorClassName}`}
                totalResults={totalResults}
                numberOfPages={numberOfPages}
                page={page}
                onPageChange={onPageChange}
            />
            <CardGrid loading={loading} gridClassName={gridClassName} cards={searchResults} isLink={isLink} onClick={onSelectResult} />
        </div>
    );
}

PaginatedResults.propTypes = {
    forwardRef: PropTypes.object,
    loading: PropTypes.bool,
    className: PropTypes.string,
    paginatorClassName: PropTypes.string,
    gridClassName: PropTypes.string,
    onSelectResult: PropTypes.func,
    isLink: PropTypes.bool,
    redirect: PropTypes.bool,
    name: PropTypes.string,
    text: PropTypes.string,
    selectedTypes: PropTypes.array,
    colors: PropTypes.object,
    matchType: PropTypes.string,
    selectedSets: PropTypes.array,
    cmc: PropTypes.object,
    power: PropTypes.object,
    toughness: PropTypes.object,
    loyalty: PropTypes.object,
    rarities: PropTypes.object,
    flavorText: PropTypes.string,
    page: PropTypes.number,
    setPage: PropTypes.func,
    totalResults: PropTypes.number,
    setTotalResults: PropTypes.func,
    searchResults: PropTypes.array,
    setSearchResults: PropTypes.func,
    numberOfPages: PropTypes.number,
    setNumberOfPages: PropTypes.func,
};

export default PaginatedResults;
