import { useState, useContext } from 'react';
import { parseIntFallback } from '../../helpers/parse';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import Input from '../Input';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearch.scss';

export default function DeckBuilderSearch() {
    const [query, setQuery] = useState('');
    const { searchCards } = useSearch();
    const { displayResults } = useDisplayResults();
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards, maybeboardMode, setName, setPage } = useContext(DeckBuilderContext);

    const onSubmit = async e => {
        e.preventDefault();
        setName(query);
        setPage(1);

        const response = await searchCards({ name: query });
        displayResults(response, true);
    };

    const onSelectResult = (e, card) => {
        const location = maybeboardMode ? 'maybeboard' : 'deck';
        const cardList = maybeboardMode ? maybeboardCards : deckCards;
        const updateCardList = maybeboardMode ? setMaybeboardCards : setDeckCards;
        const index = cardList.findIndex(c => c.card_id === card.card_id);
        let cards = [];

        if (index === -1) {
            cards = [
                ...cardList,
                {
                    ...card,
                    count: 1,
                    selection_type: 'automatic',
                    location,
                },
            ];
        } else {
            const oldCount = parseIntFallback(cardList[index].count, 0);
            const count = e.shiftKey ? Math.max(oldCount - 1, 0) : oldCount + 1;
            cards = [
                ...cardList.slice(0, index),
                {
                    ...cardList[index],
                    count,
                },
                ...cardList.slice(index + 1),
            ];
        }

        updateCardList(cards);
    };

    const onSearch = e => {
        setQuery(e.target.value);
    };

    return (
        <div className='DeckBuilderSearch'>
            <form className='DeckBuilderSearch-searchForm' onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={query} placeholder='Search' onChange={onSearch} />
            </form>
            <PaginatedResults className='DeckBuilderSearch-results' redirect={false} deckBuilder={true} onSelectResult={onSelectResult} />
        </div>
    );
}
