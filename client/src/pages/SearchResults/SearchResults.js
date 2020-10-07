import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/CardContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

const SearchResults = props => {
    const history = useHistory();
    const { query, setQuery, currentPage, setCurrentPage } = useContext(SearchResultsContext);
    const { setCard } = useContext(CardContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const urlParams = new URLSearchParams(props?.location?.search);
    const urlQuery = urlParams.get('name') || '';
    const urlCurrentPage = parseInt(urlParams.get('page')) || 1;

    // If the page is loaded directly, use the query and page from the URL params
    useEffect(() => {
        let updated = false;

        if (query !== urlQuery) {
            setQuery(urlQuery);
            updated = true;
        }

        if (currentPage !== urlCurrentPage) {
            setCurrentPage(urlCurrentPage);
            updated = true;
        }

        if (updated) {
            fetchResults(urlQuery, urlCurrentPage);
        }
    }, [urlQuery, urlCurrentPage]);

    // TODO: Handle case where &page > max pages (e.g. ?name=dragon&page=6)
    const fetchResults = async (query = '', currentPage = 1, redirect = false) => {
        const response = await basicSearch(query, currentPage);
        displayResults(response, query, currentPage, redirect);
    };

    const onSelectResult = card => {
        setCard(card);
        history.push(`/cards/${card.card_id}`);
    };

    return (
        <HeaderPage className='SearchResults'>
            <PaginatedResults onSelectResult={onSelectResult} />
        </HeaderPage>
    );
};

export default SearchResults;
