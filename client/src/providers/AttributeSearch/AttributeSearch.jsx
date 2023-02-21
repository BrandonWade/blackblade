import { useState } from 'react';
import AttributeSearchContext from '../../contexts/AttributeSearch';

export default function AttributeSearchProvider({ children = [] }) {
    const [cardTypes, setCardTypes] = useState([]);
    const [cardSets, setCardSets] = useState([]);

    const props = {
        cardTypes,
        cardSets,
        setCardTypes,
        setCardSets,
    };

    return <AttributeSearchContext.Provider value={props}>{children}</AttributeSearchContext.Provider>;
}
