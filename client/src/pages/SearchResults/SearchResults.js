import React, { useContext, useEffect } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults/useDisplayResults';
import SearchResultContext from '../../contexts/SearchResultsContext';
import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

const SearchResults = props => {
    const { setQuery, setCurrentPage } = useContext(SearchResultContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    // If the page is loaded directly, use the query and page from the URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(props?.location?.search);
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

    return (
        <HeaderPage className='SearchResults'>
            <PaginatedResults />
        </HeaderPage>
    );
};

export default SearchResults;
