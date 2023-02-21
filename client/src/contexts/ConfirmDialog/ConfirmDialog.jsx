import { createContext } from 'react';

export const initialState = {
    visible: false,
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
};

export default createContext(initialState);
