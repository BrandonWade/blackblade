import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckBuilderSearchResults from '../../components/DeckBuilderSearchResults';
import DeckPreview from '../../components/DeckPreview';

export default function useDeckBuilderTabs() {
    return [
        {
            title: 'Search Cards',
            content: <DeckBuilderSearch />,
        },
        {
            title: 'Search Results',
            content: <DeckBuilderSearchResults />,
        },
        {
            title: 'Deck Preview',
            content: <DeckPreview />,
        },
    ];
}
