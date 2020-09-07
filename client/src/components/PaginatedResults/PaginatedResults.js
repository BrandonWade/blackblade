import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults/useDisplayResults';
import SearchResultContext from '../../contexts/SearchResultsContext';
import CardFaceContext from '../../contexts/CardFaceContext';
import Paginator from '../../components/Paginator';
import './PaginatedResults.scss';

const PaginatedResults = ({ location = {}, className = '' }) => {
    const history = useHistory();
    const { query, setQuery, searchResults, setCurrentPage } = useContext(SearchResultContext);
    const { setPrimaryCardFace } = useContext(CardFaceContext);
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
        displayResults(response, query, currentPage);
    };

    const onPageChange = currentPage => {
        setCurrentPage(currentPage);
        fetchResults(query, currentPage);
    };

    const onSelectResult = cardFace => {
        setPrimaryCardFace(cardFace);
        history.push(`/cards/${cardFace.id}`);
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
                            key={card.id}
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
