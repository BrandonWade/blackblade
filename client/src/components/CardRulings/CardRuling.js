import useSymbols from '../../hooks/useSymbols';

export default function CardRuling({ comment = '', publishedAt = '' }) {
    return (
        <div className='CardRulings-ruling'>
            <div className='CardRulings-publishedAt'>{publishedAt}</div>
            <div className='CardRulings-comment' dangerouslySetInnerHTML={{ __html: useSymbols(comment) }} />
        </div>
    );
}
