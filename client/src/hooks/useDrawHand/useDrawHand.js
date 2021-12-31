import { useContext } from 'react';
import { shuffle } from 'lodash';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DrawHandDialogContext from '../../contexts/DrawHandDialog';
import { inflateDeck } from '../../helpers/deck';

export default function useDrawHand() {
    const { deckCards } = useContext(DeckBuilderContext);
    const { handSize, setHand, setVisible } = useContext(DrawHandDialogContext);

    const drawHand = () => {
        const inflatedDeck = inflateDeck(deckCards);
        const shuffledDeck = shuffle(inflatedDeck);
        const cardsToDraw = Math.min(shuffledDeck.length, handSize);

        setHand(shuffledDeck.slice(0, cardsToDraw));
        setVisible(true);
    };

    return {
        drawHand,
    };
}
