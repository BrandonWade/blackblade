import { useState } from 'react';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';

export default function AdvancedSearchProvider({ children = [] }) {
    const [cardTypes, setCardTypes] = useState([]);
    const [cardSets, setCardSets] = useState([]);

    const props = {
        cardTypes,
        cardSets,
        setCardTypes,
        setCardSets,
    };

    return <AdvancedSearchContext.Provider value={props}>{children}</AdvancedSearchContext.Provider>;
}
