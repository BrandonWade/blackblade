export default function DeckBuilderTabContent({ isSelected = false, content = [] }) {
    return <div className={`DeckBuilderTabs-content ${isSelected ? 'DeckBuilderTabs-content--selected' : ''}`}>{content}</div>;
}
