import PropTypes from 'prop-types';
import CardSection from '../CardSection';
import CardRuling from './CardRuling';
import './CardRulings.scss';

function CardRulings({ loading = false, className = '', rulings = [] }) {
    const sortedRulings = rulings?.sort((a, b) => a.published_at.localeCompare(b.published_at)) || [];

    if (loading) {
        return (
            <CardSection className={`CardRulings ${className}`}>
                <CardRuling loading={loading} />
                <CardRuling loading={loading} />
                <CardRuling loading={loading} />
                <CardRuling loading={loading} />
                <CardRuling loading={loading} />
            </CardSection>
        );
    }

    return sortedRulings?.length > 0 ? (
        <CardSection className={`CardRulings ${className}`}>
            {sortedRulings.map(ruling => {
                return <CardRuling key={ruling.id} comment={ruling.comment} publishedAt={ruling.published_at} />;
            })}
        </CardSection>
    ) : null;
}

CardRulings.propTypes = {
    loading: PropTypes.bool,
    className: PropTypes.string,
    rulings: PropTypes.array,
};

export default CardRulings;
