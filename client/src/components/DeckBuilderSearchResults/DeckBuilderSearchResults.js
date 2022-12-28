import { useContext } from 'react';
import { parseIntFallback } from '../../helpers/parse';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckBuilderSearchContext from '../../contexts/DeckBuilderSearch';
import PaginatedResults from '../../components/PaginatedResults';
import './DeckBuilderSearchResults.scss';

export default function DeckBuilderSearchResults({ forwardRef = null }) {
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards, maybeboardMode } = useContext(DeckBuilderContext);
    const {
        name,
        text,
        selectedTypes,
        colors,
        matchType,
        selectedSets,
        cmc,
        power,
        toughness,
        loyalty,
        rarities,
        flavorText,
        page,
        totalResults,
        setTotalResults,
        searchResults,
        setSearchResults,
        numberOfPages,
        setNumberOfPages,
        setPage,
    } = useContext(DeckBuilderSearchContext);

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
                forwardRef={forwardRef}
                className='DeckBuilderSearchResults-results'
                paginatorClassName='DeckBuilderSearchResults-paginator'
                gridClassName='DeckBuilderSearchResults-grid'
                redirect={false}
                name={name}
                text={text}
                selectedTypes={selectedTypes}
                colors={colors}
                matchType={matchType}
                selectedSets={selectedSets}
                cmc={cmc}
                power={power}
                toughness={toughness}
                loyalty={loyalty}
                rarities={rarities}
                flavorText={flavorText}
                page={page}
                totalResults={totalResults}
                setTotalResults={setTotalResults}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                numberOfPages={numberOfPages}
                setNumberOfPages={setNumberOfPages}
                setPage={setPage}
                onSelectResult={onSelectResult}
            />
        </div>
    );
}
