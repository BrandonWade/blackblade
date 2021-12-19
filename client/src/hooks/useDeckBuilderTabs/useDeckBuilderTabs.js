import AttributeSearch from '../../components/AttributeSearch';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckPreview from '../../components/DeckPreview';

export default function useDeckBuilderTabs() {
    return [
        {
            title: 'Search Cards',
            content: <AttributeSearch />,
        },
        {
            title: 'Search Results',
            content: <DeckBuilderSearch />,
        },
        {
            title: 'Deck Preview',
            content: <DeckPreview />,
        },
    ];
}
