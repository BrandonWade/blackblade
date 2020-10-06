import { createContext } from 'react';

export const colorInitialState = {
    white: false,
    blue: false,
    black: false,
    red: false,
    green: false,
};

export default createContext({
    name: '',
    setName: () => {},
    text: '',
    setText: () => {},
    type: '',
    setType: () => {},
    colors: colorInitialState,
    setManaCost: () => {},
    manaCost: '',
    setManaCost: () => {},
});
