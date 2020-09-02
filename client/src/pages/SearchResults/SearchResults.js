import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import SearchResultContext from '../../contexts/SearchResultsContext';
import CardFaceContext from '../../contexts/CardFaceContext';
import HeaderPage from '../../components/HeaderPage';
import Paginator from '../../components/Paginator';
import './SearchResults.scss';

const SearchResults = props => {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const { searchResults, setSearchResults } = useContext(SearchResultContext);
    const { setCardFace } = useContext(CardFaceContext);
    const { basicSearch } = useSearch();
    const urlParams = new URLSearchParams(props.location.search);
    const query = urlParams.get('q');

    const fetchResults = async () => {
        const response = await basicSearch(query, currentPage);
        if (response.success) {
            if (response?.results.length === 1 || (response?.results.length === 2 && response?.results[0].id === response?.results[1].id)) {
                const card = response.results[0];

                setCardFace(card);
                setCurrentPage(1);
                setNumPages(1);
                history.push(`/cards/${card.id}`);
            } else {
                setSearchResults(response.results);
                setNumPages(response.pages);
                history.push({
                    search: `?q=${query}&page=${currentPage}`,
                });
            }
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        fetchResults();
    }, [currentPage]);

    const onSelectResult = card => {
        setCardFace(card);
        history.push(`/cards/${card.id}`);
    };

    return (
        <HeaderPage className='SearchResults'>
            <div className='SearchResults-content'>
                <Paginator className='Paginator--top' currentPage={currentPage} setCurrentPage={setCurrentPage} numPages={numPages} />
                <div className='SearchResults-results'>
                    {searchResults.map(card => {
                        const cardSets = JSON.parse(card.set_name_image_json || '[]');
                        const cardSet = cardSets.length > 0 ? cardSets[0] : {};

                        return (
                            <img
                                key={card.id}
                                src={cardSet.image}
                                alt={card.name}
                                className='SearchResults-image'
                                onClick={() => onSelectResult(card)}
                            />
                        );
                    })}
                </div>
                <Paginator className='Paginator--bottom' currentPage={currentPage} setCurrentPage={setCurrentPage} numPages={numPages} />
            </div>
        </HeaderPage>
    );
};

export default SearchResults;
