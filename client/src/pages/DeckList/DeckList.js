import HeaderPage from '../../components/HeaderPage';
import './DeckList.scss';

function DeckList() {
    const decks = [
        {
            name: 'Untitled Deck 1',
            size: 60,
        },
        {
            name: 'Untitled Deck 2',
            size: 17,
        },
        {
            name: 'Untitled Deck 3',
            size: 200,
        },
        {
            name: 'Untitled Deck 4',
            size: 99,
        },
        {
            name: 'Untitled Deck 5',
            size: 0,
        },
    ];

    return (
        <HeaderPage className='DeckList'>
            <div className='DeckList-content'>
                <div className='DeckList-list'>
                    {decks.map(deck => (
                        <div className='DeckList-deck'>
                            <div className='DeckList-deckName'>{deck.name}</div>
                            <div className='DeckList-deckSize'>{`${deck.size} cards`}</div>
                            <div className='DeckList-deckColors'>
                                <img class='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/G.svg' alt='Symbol G' />
                                <img class='DeckList-color' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/U.svg' alt='Symbol U' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default DeckList;
