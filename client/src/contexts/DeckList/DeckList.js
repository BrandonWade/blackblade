import { createContext } from 'react';

export const initialState = [
    {
        public_id: 'f37843413aac078f',
        name: 'Untitled Deck 1',
        size: 60,
    },
    {
        public_id: 'a3bd1310dd6ce154',
        name: 'Untitled Deck 2',
        size: 17,
    },
    {
        public_id: 'f48a846ec670a8d1',
        name: 'Untitled Deck 3',
        size: 200,
    },
    {
        public_id: '2cf1677cb50d5c3e',
        name: 'Untitled Deck 4',
        size: 99,
    },
    {
        public_id: 'e63ba3d622606529',
        name: 'Untitled Deck 5 asdfasdfasdf asdfadsfasdfasdfasdfasdfasdfasdfsdsdfsdfsdfsdfsdfsdf 123123 asad easd asfas dafasd',
        size: 0,
    },
];

export default createContext(initialState);
