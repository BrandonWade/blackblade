import { useState } from 'react';
import CardListContext, { initialState } from '../../contexts/CardList';

function CardListProvider({ children = [] }) {
    const [cardList, setCardList] = useState(initialState);

    const props = {
        cardList,
        setCardList,
    };

    return <CardListContext.Provider value={props}>{children}</CardListContext.Provider>;
}

export default CardListProvider;
