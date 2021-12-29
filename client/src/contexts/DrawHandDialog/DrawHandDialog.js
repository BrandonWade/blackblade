import { createContext } from 'react';

export const initialState = {
    visible: false,
    hand: [],
};

export default createContext(initialState);
