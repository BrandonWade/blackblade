export default function SymbolRow({ image = null, text = '', onClick = () => {} }) {
    const onRowClick = () => {
        onClick(text);
    };

    return (
        <div key={text} className='SymbolKey-symbolRow' onClick={onRowClick}>
            <div className='SymbolKey-symbolImage' dangerouslySetInnerHTML={{ __html: image }} />
            <div className='SymbolKey-symbolText'>{text}</div>
        </div>
    );
}
