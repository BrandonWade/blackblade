import { useState } from 'react';
import CardArtSelectorContext, { initialState } from '../../contexts/CardArtSelector';

function CardArtSelectorProvider({ children = [] }) {
    const [artSelectorVisible, setArtSelectorVisible] = useState(initialState);

    const props = {
        artSelectorVisible,
        setArtSelectorVisible,
    };

    return <CardArtSelectorContext.Provider value={props}>{children}</CardArtSelectorContext.Provider>;
}

export default CardArtSelectorProvider;
