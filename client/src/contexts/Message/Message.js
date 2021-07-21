import { createContext } from 'react';

export const initialState = {
    message: {
        type: 'info',
        text: '',
    },
    duration: 6500,
};

export default createContext(initialState);
