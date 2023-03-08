import PropTypes from 'prop-types';
import CardSection from '../CardSection';
import CardSet from './CardSet';
import './CardSets.scss';

function CardSets({ loading = false, cardSets = [], currentCardID = 0 }) {
    if (loading) {
        return (
            <CardSection className='CardSets'>
                <div className='CardSets-list'>
                    <CardSet loading={loading} />
                    <CardSet loading={loading} />
                    <CardSet loading={loading} />
                    <CardSet loading={loading} />
                    <CardSet loading={loading} />
                </div>
            </CardSection>
        );
    }

    return cardSets.length > 0 ? (
        <CardSection className='CardSets'>
            <div className='CardSets-list'>
                {cardSets.map(set => {
                    return (
                        <CardSet
                            key={set.card_id}
                            className={currentCardID === set.card_id ? 'CardSets-selectedSet' : ''}
                            cardID={set.card_id}
                            setName={set.set_name}
                            price={set.price}
                            previewImageFront={set?.faces_json?.[0]?.image || ''}
                            previewImageBack={set?.faces_json?.[1]?.image || ''}
                            previewLocation='left'
                        />
                    );
                })}
            </div>
        </CardSection>
    ) : null;
}

CardSets.propTypes = {
    loading: PropTypes.bool,
    cardSets: PropTypes.array,
    currentCardID: PropTypes.number,
};

export default CardSets;
