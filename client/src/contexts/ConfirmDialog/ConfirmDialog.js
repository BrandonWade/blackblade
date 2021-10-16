import { createContext } from 'react';

export const initialState = {
    visible: false,
    message: '',
    onAccept: () => {},
    onCancel: () => {},
};

export default createContext(initialState);
