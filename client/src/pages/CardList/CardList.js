import { useContext, useEffect } from 'react';
import useCard from '../../hooks/useCard';
import CardListContext from '../../contexts/CardList';
import HeaderPage from '../../components/HeaderPage';
import Card from './Card';
import './CardList.scss';

function CardList() {
    const { listCards, deleteCard } = useCard();
    const { cardList, setCardList } = useContext(CardListContext);

    useEffect(() => {
        const fetchCardList = async () => {
            const result = await listCards();
            if (!result.success) {
                return;
            }

            setCardList(result.cards);
        };

        fetchCardList();
    }, []);

    const onRemoveCard = async cardID => {
        const result = await deleteCard(cardID);
        if (!result.success) {
            return;
        }

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
