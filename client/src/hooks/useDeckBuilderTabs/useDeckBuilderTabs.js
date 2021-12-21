import { useContext } from 'react';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckBuilderSearchResults from '../../components/DeckBuilderSearchResults';
import DeckPreview from '../../components/DeckPreview';

export default function useDeckBuilderTabs() {
    const { setSelectedTabIndex } = useContext(DeckBuilderContext);
    const deckBuilderTabs = [
        {
            id: 'search_cards',
            title: 'Search Cards',
            content: <DeckBuilderSearch />,
        },
        {
            id: 'search_results',
            title: 'Search Results',
            content: <DeckBuilderSearchResults />,
        },
        {
            id: 'deck_preview',
            title: 'Deck Preview',
            content: <DeckPreview />,
        },
    ];

    const getDeckBuilderTabs = () => {
        return deckBuilderTabs;
    };

    const selectTabByID = id => {
        const index = deckBuilderTabs.findIndex(t => t.id === id) || 0;
        setSelectedTabIndex(index);
    };

    return {
        getDeckBuilderTabs,
        selectTabByID,
    };
}
