import { createContext } from 'react';

export const initialState = {
    message: {
        type: 'info',
        text: '',
    },
    duration: 3000,
};

export default createContext(initialState);
