import { useState, useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import Input from '../Input';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearch.scss';

function DeckBuilderSearch() {
    const [query, setQuery] = useState('');
    const { searchCards } = useSearch();
    const { displayResults } = useDisplayResults();
    const { setName } = useContext(SearchContext);
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID, deckCards, setDeckCards, maybeboardCards, setMaybeboardCards, maybeboardMode } = useContext(DeckBuilderContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;

    const onSubmit = async e => {
        e.preventDefault();

        setName(query);
        const response = await searchCards({ name: query });
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
        setQuery(e.target.value);
    };

    return ownsDeck ? (
        <div className='DeckBuilderSearch'>
            <form className='DeckBuilderSearch-searchForm' onSubmit={onSubmit}>
                <Input className='DeckBuilderSearch-searchBar' value={query} placeholder='Search' onChange={onSearch} />
            </form>
            <PaginatedResults className='DeckBuilderSearch-results' redirect={false} onSelectResult={onSelectResult} />
        </div>
    ) : null;
}

export default DeckBuilderSearch;
