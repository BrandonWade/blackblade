import { createContext } from 'react';

export const initialState = {
    cardTypes: [],
    cardSets: [],
};

export default createContext(initialState);
