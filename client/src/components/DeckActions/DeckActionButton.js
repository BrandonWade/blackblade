export default function DeckActionButton({ visible = true, children = [], onClick = () => {} }) {
    return visible ? (
        <div className='DeckActions-button' onClick={onClick}>
            {children}
        </div>
    ) : null;
}
