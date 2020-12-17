import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import Input from '../Input';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearch.scss';

const DeckBuilderSearch = () => {
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { name, setName } = useContext(SearchContext);
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards, maybeboardMode } = useContext(DeckBuilderContext);
    const redirect = false;
    const redirectForSingleResult = false;

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(name);
        displayResults(response, { name, page: 1 }, redirect, redirectForSingleResult);
    };

    const onSelectResult = card => {
        const location = maybeboardMode ? 'maybeboard' : 'deck';
        const cardList = maybeboardMode ? maybeboardCards : deckCards;
        const updateCardList = maybeboardMode ? setMaybeboardCards : setDeckCards;
        const exists = cardList.some(c => c.card_id === card.card_id);

        if (!exists) {
            const cards = [
                ...cardList,
                {
                    ...card,
                    count: 1,
                    selection_type: 'automatic',
                    location,
                },
            ];

            updateCardList(cards);
        }
    };

    return (
        <div className='DeckBuilderSearch'>
            <form className='DeckBuilderSearch-searchForm' onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={name} placeholder='Search' onChange={e => setName(e.target.value)} />
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
