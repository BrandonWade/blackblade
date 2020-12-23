import React, { useState } from 'react';
import CardContext, { initialState } from '../../contexts/Card';

function CardProvider({ children = [] }) {
    const [card, setCard] = useState(initialState);

    const props = {
        card,
        setCard,
    };

    return <CardContext.Provider value={props}>{children}</CardContext.Provider>;
}

export default CardProvider;
