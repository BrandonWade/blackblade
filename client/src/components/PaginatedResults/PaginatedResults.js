import React, { useContext, useEffect } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Paginator from '../../components/Paginator';
import './PaginatedResults.scss';

const PaginatedResults = ({ location = {}, className = '', onSelectResult = () => {}, redirectForSingleResult = true }) => {
    const { query, setQuery, searchResults, setCurrentPage } = useContext(SearchResultsContext);

    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    // If the page is loaded directly, use the query and page from the URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(location?.search);
        const query = urlParams.get('q') || '';
        const currentPage = parseInt(urlParams.get('page')) || 1;
        setQuery(query);
        setCurrentPage(currentPage);
        fetchResults(query, currentPage);
    }, []);

    // TODO: Handle case where &page > max pages (e.g. ?q=dragon&page=6)
    const fetchResults = async (query = '', currentPage = 1) => {
        const response = await basicSearch(query, currentPage);
        displayResults(response, currentPage, redirectForSingleResult);
        // resultsRedirect(response?.results, query, currentPage);
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
                    const cardSets = JSON.parse(card.set_name_image_json || '[]');
                    const cardSet = cardSets.length > 0 ? cardSets[0] : {};

                    return (
                        <img
                            key={card.card_id}
                            src={cardSet.image}
                            alt={card.name}
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
