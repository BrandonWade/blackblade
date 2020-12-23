import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import Input from '../Input';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearch.scss';

function DeckBuilderSearch() {
    const { searchCards } = useSearch();
    const { displayResults } = useDisplayResults();
    const { name, setName } = useContext(SearchContext);
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards, maybeboardMode } = useContext(DeckBuilderContext);

    const onSubmit = async e => {
        e.preventDefault();

        const params = { name };
        const response = await searchCards(params);
        displayResults(response);
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

    const onSearch = e => {
        setName(e.target.value);
    };

    return (
        <div className='DeckBuilderSearch'>
            <form className='DeckBuilderSearch-searchForm' onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={name} placeholder='Search' onChange={onSearch} />
            </form>
            <PaginatedResults className='DeckBuilderSearch-results' onSelectResult={onSelectResult} />
        </div>
    );
}

export default DeckBuilderSearch;
