import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Paginator from '../../components/Paginator';
import './PaginatedResults.scss';

const PaginatedResults = ({ className = '', onSelectResult = () => {}, redirect = true, redirectForSingleResult = true }) => {
    const { query, searchResults, setCurrentPage } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    // TODO: Handle case where &page > max pages (e.g. ?q=dragon&page=6)
    const fetchResults = async (query = '', currentPage = 1) => {
        const response = await basicSearch(query, currentPage);
        displayResults(response, query, currentPage, redirect, redirectForSingleResult);
    };

    const onPageChange = currentPage => {
        setCurrentPage(currentPage);
        fetchResults(query, currentPage);
    };

    return (
        <div className={`PaginatedResults-content ${className}`}>
            <Paginator className='PaginatedResults-paginator' onPageChange={onPageChange} />
            <div className='PaginatedResults-results'>
                {searchResults.map(card => {
                    return (
                        <img
                            key={card.card_id}
                            src={card?.faces_json[0]?.image}
                            alt={card?.faces_json[0]?.name}
                            className='PaginatedResults-image'
                            onClick={() => onSelectResult(card)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PaginatedResults;
