import DeckBuilderSearch from '../../components/DeckBuilderSearch';

export default function useDeckBuilderTabs() {
    return [
        {
            title: 'Search Cards',
            content: <DeckBuilderSearch />,
        },
    ];
}
