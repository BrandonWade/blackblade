import React, { useState } from 'react';
import AdvancedSearchContext from '../../contexts/AdvancedSearch';

function AdvancedSearchProvider({ children = [] }) {
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

export default AdvancedSearchProvider;
