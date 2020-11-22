import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import Paginator from '../../components/Paginator';
import NoResults from '../NoResults';
import './PaginatedResults.scss';

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
            <NoResults showMessage={searchResults.length === 0}>
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
            </NoResults>
        </div>
    );
};

export default PaginatedResults;
