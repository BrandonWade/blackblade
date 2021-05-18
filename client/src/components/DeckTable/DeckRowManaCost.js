import useSymbols from '../../hooks/useSymbols';

function DeckRowManaCost({ manaCost = '' }) {
    const symbols = useSymbols(manaCost);

    return <span className='DeckTable-manaCostSymbols' dangerouslySetInnerHTML={{ __html: symbols }} />;
}

export default DeckRowManaCost;
