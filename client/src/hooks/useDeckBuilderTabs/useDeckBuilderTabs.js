import DeckPreview from '../../components/DeckPreview';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';

export default function useDeckBuilderTabs() {
    return [
        {
            title: 'Search Cards',
            content: <DeckBuilderSearch />,
        },
        {
            title: 'Deck Preview',
            content: <DeckPreview />,
        },
    ];
}
