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
    const redirect = false;
    const redirectForSingleResult = false;

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(query);
        displayResults(response, query, 1, redirect, redirectForSingleResult);
    };

    const onSelectResult = card => {
        const exists = deckCards.some(c => c.card_id === card.card_id);
        if (!exists) {
            const cards = [
                ...deckCards,
                {
                    ...card,
                    count: 1,
                },
            ];

            // TODO: Order by CMC

            setDeckCards(cards);
        }
    };

    return (
        <div className='DeckBuilderSearch'>
            <form onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={query} placeholder='Search' onChange={e => setQuery(e.target.value)} />
            </form>
            <PaginatedResults
                className='DeckBuilderSearch-results'
                redirect={redirect}
                redirectForSingleResult={redirectForSingleResult}
                onSelectResult={onSelectResult}
            />
        </div>
    );
};

export default DeckBuilderSearch;
