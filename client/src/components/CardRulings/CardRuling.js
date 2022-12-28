import useSymbols from '../../hooks/useSymbols';
import CardSection from '../CardSection';

export default function CardRuling({ comment = '', publishedAt = '' }) {
    return (
        <CardSection className='CardRulings-ruling'>
            <div className='CardRulings-publishedAt'>{publishedAt}</div>
            <div className='CardRulings-comment' dangerouslySetInnerHTML={{ __html: useSymbols(comment) }} />
        </CardSection>
    );
}
