import CardSection from '../CardSection';
import CardRuling from './CardRuling';
import './CardRulings.scss';

export default function CardRulings({ rulings = [] }) {
    const sortedRulings = rulings?.sort((a, b) => a.published_at.localeCompare(b.published_at)) || [];

    return sortedRulings?.length > 0 ? (
        <div className='CardRulings'>
            <CardSection className='CardRulings-rulingsContainer'>
                {sortedRulings.map(ruling => {
                    return <CardRuling key={ruling.id} comment={ruling.comment} publishedAt={ruling.published_at} />;
                })}
            </CardSection>
        </div>
    ) : null;
}
