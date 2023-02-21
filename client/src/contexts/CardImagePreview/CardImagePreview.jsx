import { createContext } from 'react';

export const initialState = {
    top: 0,
    left: 0,
    frontImage: '',
    backImage: '',
    visible: false,
};

export default createContext(initialState);
