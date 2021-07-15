import { createContext } from 'react';

export const initialState = {
    top: 0,
    left: 0,
    image: '', // TODO: Convert to array
    visible: false,
};

export default createContext(initialState);
