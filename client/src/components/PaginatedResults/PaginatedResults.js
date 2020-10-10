import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import Paginator from '../../components/Paginator';
import './PaginatedResults.scss';

const PaginatedResults = ({ className = '', onSelectResult = () => {}, redirect = true, redirectForSingleResult = true }) => {
    const { name, text, searchResults, setPage } = useContext(SearchContext);
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    // TODO: Handle case where &page > max pages (e.g. ?name=dragon&page=6)
    const fetchResults = async (page = 1) => {
        const response = await advancedSearch({ name, text, page });
        displayResults(response, { name, text, page }, redirect, redirectForSingleResult);
    };

    const onPageChange = page => {
        setPage(page);
        fetchResults(page);
    };

    return (
        <div className={`PaginatedResults-content ${className}`}>
            <Paginator className='PaginatedResults-paginator' onPageChange={onPageChange} />
            <div className='PaginatedResults-results'>
                {searchResults.map(card => {
                    const cardFace = card?.sets_json?.[0]?.card_faces?.[0];
                    return (
                        <img
                            key={card.card_id}
                            src={cardFace.image || ''}
                            alt={cardFace.name || ''}
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
