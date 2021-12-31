import { createContext } from 'react';

export const initialState = {
    handSize: 7,
    hand: [],
    visible: false,
};

export default createContext(initialState);
