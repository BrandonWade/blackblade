import CardRuling from './CardRuling';
import './CardRulings.scss';

export default function CardRulings({ rulings = [] }) {
    return rulings?.length > 0 ? (
        <div className='CardRulings'>
            {rulings.map(ruling => {
                return <CardRuling key={ruling.id} comment={ruling.comment} publishedAt={ruling.published_at} />;
            })}
        </div>
    ) : null;
}
