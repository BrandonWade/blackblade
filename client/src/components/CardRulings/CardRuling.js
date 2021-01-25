import useSymbols from '../../hooks/useSymbols';
import CardSection from '../CardSection';

function CardRuling({ comment = '', publishedAt = '' }) {
    return (
        <CardSection className='CardRulings-ruling'>
            <div className='CardSection-rowItem CardRulings-comment' dangerouslySetInnerHTML={{ __html: useSymbols(comment) }} />
            <div className='CardSection-rowItem CardRulings-publishedAt'>{publishedAt}</div>
        </CardSection>
    );
}

export default CardRuling;
