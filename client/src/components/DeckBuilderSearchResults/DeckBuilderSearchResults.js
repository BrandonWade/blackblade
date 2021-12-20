import { useContext } from 'react';
import { parseIntFallback } from '../../helpers/parse';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearchResults.scss';

export default function DeckBuilderSearchResults() {
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards, maybeboardMode } = useContext(DeckBuilderContext);

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

    return (
        <div className='DeckBuilderSearchResults'>
            <PaginatedResults
                className='DeckBuilderSearchResults-results'
                paginatorClassName='DeckBuilderSearchResults-paginator'
                gridClassName='DeckBuilderSearchResults-grid'
                redirect={false}
                deckBuilder={true}
                onSelectResult={onSelectResult}
            />
        </div>
    );
}
