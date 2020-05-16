import React from 'react';
import CardInfo from '../CardInfo/CardInfo';
import './App.css';

const card = {
    title: 'Korlash, Heir to Blackblade',
    manaCost: '{2}{B}{B}',
    type: 'Legendary Creature — Zombie Warrior',
    text:
        'Korlash, Heir to Blackblade’s power and toughness are each equal to the number of Swamps you control.\n{1}{B}: Regenerate Korlash.\nGrandeur — Discard another card named Korlash, Heir to Blackblade: Search your library for up to two Swamp cards, put them onto the battlefield tapped, then shuffle your library.',
    stats: '*/*',
    set: 'Prerelease Events',
    sets: ['Future Sight', 'Prerelease Events'],
};

const App = () => {
    return <CardInfo card={card} />;
};

export default App;
