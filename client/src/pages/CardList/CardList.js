import HeaderPage from '../../components/HeaderPage';
import Card from './Card';
import './CardList.scss';

function CardList() {
    const cards = [
        {
            id: 1,
            card_id: 31042,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/9/2/92d07c87-4f7e-48a4-949a-087dd391d1d4.jpg?1606761689',
            name: 'Korlash, Heir to Blackblade',
            tags: [],
        },
        {
            id: 2,
            card_id: 31042,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/9/2/92d07c87-4f7e-48a4-949a-087dd391d1d4.jpg?1606761689',
            name: 'Korlash, Heir to Blackblade',
            tags: [],
        },
    ];

    return (
        <HeaderPage className='CardList'>
            <div className='CardList-content'>
                <div className='CardList-list'>
                    {cards.map(card => (
                        <Card key={card.id} cardID={card.card_id} image={card.image} name={card.name} tags={card.tags} />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default CardList;
