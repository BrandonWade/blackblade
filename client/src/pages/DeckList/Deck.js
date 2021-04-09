function Deck({ publicID = '', name = '', size = 0, colors = {}, removeDeck = () => {} }) {
    const onRemoveClick = () => {
        removeDeck(publicID);
    };

    const renderColors = () => {
        return (
            <>
                <img className='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/G.svg' alt='Symbol G' />
                <img className='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/U.svg' alt='Symbol U' />
                <img className='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/R.svg' alt='Symbol R' />
                <img className='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/B.svg' alt='Symbol B' />
                <img className='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/W.svg' alt='Symbol W' />
                <img className='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/C.svg' alt='Symbol C' />
            </>
        );
    };

    return (
        <div key={publicID} className='DeckList-deck'>
            <div className='DeckList-delete' onClick={onRemoveClick}>
                &#x2715;
            </div>
            <div className='DeckList-deckName'>{name}</div>
            <div className='DeckList-deckSize'>{`${size} cards`}</div>
            <div className='DeckList-deckColors'>{renderColors()}</div>
        </div>
    );
}

export default Deck;
