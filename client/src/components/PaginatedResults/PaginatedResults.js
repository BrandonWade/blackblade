import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import Paginator from '../../components/Paginator';
import './PaginatedResults.scss';

const PaginatedResults = ({ className = '', onSelectResult = () => {}, redirect = true }) => {
    const { name, searchResults, setPage } = useContext(SearchContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    // TODO: Handle case where &page > max pages (e.g. ?name=dragon&page=6)
    const fetchResults = async (name = '', page = 1) => {
        const response = await basicSearch(name, page);
        displayResults(response, name, page, redirect);
    };

    const onPageChange = page => {
        setPage(page);
        fetchResults(name, page);
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
