import React from 'react';
import CardContext from '../../contexts/CardContext';
import CardImage from '../CardImage';
import CardDescription from '../CardDescription';
import CardSets from '../CardSets';
import './CardInfo.scss';

const card = {
    image: 'https://img.scryfall.com/cards/large/front/9/2/92d07c87-4f7e-48a4-949a-087dd391d1d4.jpg?1562922215',
    title: 'Korlash, Heir to Blackblade',
    manaCost: '{2}{B}{B}',
    type: 'Legendary Creature — Zombie Warrior',
    text:
        'Korlash, Heir to Blackblade’s power and toughness are each equal to the number of Swamps you control.\n{1}{B}: Regenerate Korlash.\nGrandeur — Discard another card named Korlash, Heir to Blackblade: Search your library for up to two Swamp cards, put them onto the battlefield tapped, then shuffle your library.',
    stats: '*/*',
    set: 'Prerelease Events',
    sets: ['Future Sight', 'Prerelease Events'],
};

const CardInfo = () => {
    return (
        <section className='CardInfo'>
            <CardContext.Provider value={card}>
                <CardImage />
                <CardDescription />
                <CardSets />
            </CardContext.Provider>
        </section>
    );
};

export default CardInfo;
