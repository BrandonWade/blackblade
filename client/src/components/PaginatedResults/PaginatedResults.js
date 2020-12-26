import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import Paginator from '../../components/Paginator';
import CardGrid from '../CardGrid';
import './PaginatedResults.scss';

function PaginatedResults({ className = '', onSelectResult = () => {}, redirect = true }) {
    const { name, text, type, colors, set, searchResults, setPage } = useContext(SearchContext);
    const { searchCards } = useSearch();
    const { searchResultsRedirect, displayResults } = useDisplayResults();

    const fetchResults = async (page = 1) => {
        if (redirect === true) {
            searchResultsRedirect({ name, text, type, colors, set, page });
        } else {
            const response = await searchCards({ name, page });
            displayResults(response);
        }
    };

    const onPageChange = page => {
        setPage(page);
        fetchResults(page);
    };

    return (
        <div className={`PaginatedResults-content ${className}`}>
            <Paginator className='PaginatedResults-paginator' onPageChange={onPageChange} />
            <CardGrid cards={searchResults} onClick={onSelectResult} />
        </div>
    );
}

export default PaginatedResults;
