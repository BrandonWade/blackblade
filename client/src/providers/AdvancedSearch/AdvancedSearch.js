import React, { useState } from 'react';
import AdvancedSearchContext, { initialState } from '../../contexts/AdvancedSearch';

function AdvancedSearchProvider({ children = [] }) {
    const [cardSets, setCardSets] = useState(initialState);

    const props = {
        cardSets,
        setCardSets,
    };

    return <AdvancedSearchContext.Provider value={props}>{children}</AdvancedSearchContext.Provider>;
}

export default AdvancedSearchProvider;
