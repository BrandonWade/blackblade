import { createContext } from 'react';
import { initialState as searchInitialState } from '../Search';

export const initialState = searchInitialState;

export default createContext(initialState);
