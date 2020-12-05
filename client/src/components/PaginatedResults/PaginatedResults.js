import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import Paginator from '../../components/Paginator';
import CardGrid from '../CardGrid';
import './PaginatedResults.scss';

// TODO: Refactor into AJAX and non-AJAX versions
const PaginatedResults = ({ className = '', onSelectResult = () => {}, redirect = true, redirectForSingleResult = true }) => {
    const { name, text, type, colors, searchResults, setPage } = useContext(SearchContext);
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    const fetchResults = async (page = 1) => {
        const response = await advancedSearch({ name, text, type, colors, page });
        displayResults(response, { name, text, type, colors, page }, redirect, redirectForSingleResult);
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
};

export default PaginatedResults;
