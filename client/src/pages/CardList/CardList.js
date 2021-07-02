import { useContext } from 'react';
import CardListContext from '../../contexts/CardList';
import HeaderPage from '../../components/HeaderPage';
import Card from './Card';
import './CardList.scss';

function CardList() {
    const { cardList, setCardList } = useContext(CardListContext);

    const onRemoveCard = cardID => {
        setCardList(cardList.filter(card => card.card_id !== cardID));
    };

    return (
        <HeaderPage className='CardList'>
            <div className='CardList-content'>
                <div className='CardList-list'>
                    {cardList.map(card => (
                        <Card key={card.id} cardID={card.card_id} image={card.image} name={card.name} tags={card.tags} onRemoveCard={onRemoveCard} />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default CardList;
