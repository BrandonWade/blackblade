export default function DeckBuilderTabTitle({ id = '', title = '', isSelected = false, onClick = () => {} }) {
    const onTabClick = () => {
        onClick(id);
    };

    return (
        <div key={title} className={`DeckBuilderTabs-title ${isSelected ? 'DeckBuilderTabs-title--selected' : ''}`} onClick={onTabClick}>
            {title}
        </div>
    );
}
