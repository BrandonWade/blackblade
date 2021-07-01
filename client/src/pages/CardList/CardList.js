import { useState } from 'react';
import HeaderPage from '../../components/HeaderPage';
import Card from './Card';
import './CardList.scss';

function CardList() {
    const [cards, setCards] = useState([
        {
            id: 1,
            card_id: 31042,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/9/2/92d07c87-4f7e-48a4-949a-087dd391d1d4.jpg?1606761689',
            name: 'Korlash, Heir to Blackblade',
            tags: [],
        },
        {
            id: 2,
            card_id: 11437,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/3/5/359d1b13-6156-43b0-a9a7-6bfff36c1a91.jpg?1576384282',
            name: 'Thing in the Ice // Awoken Horror',
            tags: [],
        },
        {
            id: 3,
            card_id: 29017,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/8/9/8987644d-5a31-4a4e-9a8a-3d6260ed0fd6.jpg?1562488870',
            name: 'Who // What // When // Where // Why',
            tags: [],
        },
        {
            id: 4,
            card_id: 19470,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/5/c/5c1f3f52-cb9b-4b2a-bb02-6175897ae76e.jpg?1562488399',
            name: 'Our Market Research Shows That Players Like Really Long Card Names So We Made this Card to Have the Absolute Longest Card Name Ever Elemental',
            tags: [],
        },
        {
            id: 5,
            card_id: 19164,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/5/a/5aa90ab6-2686-4462-8725-5d4370c05437.jpg?1562488395',
            name: '_____',
            tags: [],
        },
        {
            id: 6,
            card_id: 36068,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/a/9/a9f9c279-e382-4feb-9575-196e7cf5d7dc.jpg?1562799139',
            name: 'B.F.M. (Big Furry Monster)',
            tags: [],
        },
        {
            id: 7,
            card_id: 44615,
            image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/d/1/d15c6375-2e4e-47f7-88e1-d90794e7f724.jpg?1562799164',
            name: 'B.F.M. (Big Furry Monster)',
            tags: [],
        },
    ]);

    const onRemoveCard = cardID => {
        setCards(cards.filter(card => card.card_id !== cardID));
    };

    return (
        <HeaderPage className='CardList'>
            <div className='CardList-content'>
                <div className='CardList-list'>
                    {cards.map(card => (
                        <Card key={card.id} cardID={card.card_id} image={card.image} name={card.name} tags={card.tags} onRemoveCard={onRemoveCard} />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default CardList;
