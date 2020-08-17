import { createContext } from 'react';

export const initialState = {
    id: '',
    mana_cost: '',
    image: '',
    name: '',
    type_line: '',
    oracle_text: '',
    rarity: '',
    set_name: '',
    artist: '',
    power: '',
    toughness: '',
    loyalty: '',
};

export default createContext({
    card: initialState,
    setCard: () => {},
});
