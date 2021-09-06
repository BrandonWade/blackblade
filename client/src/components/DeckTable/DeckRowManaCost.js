import useSymbols from '../../hooks/useSymbols';

export default function DeckRowManaCost({ manaCost = '' }) {
    const symbols = useSymbols(manaCost);

    return <span className='DeckTable-manaCostSymbols' dangerouslySetInnerHTML={{ __html: symbols }} />;
}
