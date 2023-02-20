export default function SymbolRow({ image = null, text = '', onClick = () => {} }) {
    const onRowClick = () => {
        onClick(text);
    };

    return (
        <div className='SymbolKey-symbolGridItem' onClick={onRowClick}>
            <div className='SymbolKey-image' dangerouslySetInnerHTML={{ __html: image }} />
        </div>
    );
}
