import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import Input from '../Input';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearch.scss';

const DeckBuilderSearch = () => {
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { query, setQuery } = useContext(SearchResultsContext);
    const { deckCards, setDeckCards } = useContext(DeckBuilderContext);

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(query);
        displayResults(response, 1, false);
    };

    const onSelectResult = card => {
        setDeckCards([...deckCards, card]);
    };

    return (
        <div className='DeckBuilderSearch'>
            <form onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={query} placeholder='Search' onChange={e => setQuery(e.target.value)} />
            </form>
            <PaginatedResults className='DeckBuilderSearch-results' redirectForSingleResult={false} onSelectResult={onSelectResult} />
        </div>
    );
};

export default DeckBuilderSearch;
