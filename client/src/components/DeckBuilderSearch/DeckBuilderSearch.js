import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults/useDisplayResults';
import SearchResultContext from '../../contexts/SearchResultsContext';
import Input from '../Input';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearch.scss';

const DeckBuilderSearch = () => {
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { query, setQuery } = useContext(SearchResultContext);

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(query);
        displayResults(response, query);
    };

    return (
        <div className='DeckBuilderSearch'>
            <form onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={query} placeholder='Search' onChange={e => setQuery(e.target.value)} />
            </form>
            <PaginatedResults className='DeckBuilderSearch-results' />
        </div>
    );
};

export default DeckBuilderSearch;
