import React from 'react';
import useSymbols from '../../hooks/useSymbols';

const DeckRowManaCost = ({ manaCost = '' }) => {
    const symbols = useSymbols(manaCost);

    return <div className='DeckTable-subRow DeckTable-manaSubRow' dangerouslySetInnerHTML={{ __html: symbols }} />;
};

export default DeckRowManaCost;
