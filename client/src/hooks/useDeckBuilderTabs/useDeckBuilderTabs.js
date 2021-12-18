import AdvancedSearch from '../../components/AdvancedSearch';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckPreview from '../../components/DeckPreview';

export default function useDeckBuilderTabs() {
    return [
        {
            title: 'Search Cards',
            content: <DeckBuilderSearch />,
        },
        {
            title: 'Search Cards',
            content: <AdvancedSearch />,
        },
        {
            title: 'Deck Preview',
            content: <DeckPreview />,
        },
    ];
}
