import React, { useState } from 'react';
import Input from '../Input';
import './DeckBuilderSearch.scss';

const DeckBuilderSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='DeckBuilderSearch'>
            <Input className='DeckBuilderSearch-searchBar' value={searchTerm} placeholder='Search' onChange={e => setSearchTerm(e.target.value)} />
        </div>
    );
};

export default DeckBuilderSearch;
