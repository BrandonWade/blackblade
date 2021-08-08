import CardSection from '../CardSection';
import CardSet from './CardSet';
import './CardSets.scss';

function CardSets({ cardSets = [], currentCardID = 0 }) {
    return cardSets.length > 0 ? (
        <CardSection className='CardSets'>
            <ul className='CardSets-list'>
                {cardSets.map(set => {
                    return (
                        <CardSet
                            key={set.card_id}
                            className={currentCardID === set.card_id ? 'CardSets-selectedSet' : ''}
                            cardID={set.card_id}
                            setName={set.set_name}
                            price={set.price}
                            previewImage={set?.faces_json?.[0]?.image}
                        />
                    );
                })}
            </ul>
        </CardSection>
    ) : null;
}

export default CardSets;
