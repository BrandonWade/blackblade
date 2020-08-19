import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchResultContext from '../../contexts/SearchResultsContext';
import CardContext from '../../contexts/CardContext';
import HeaderPage from '../../components/HeaderPage';
import './SearchResults.scss';

const SearchResults = () => {
    const history = useHistory();
    const { searchResults } = useContext(SearchResultContext);
    const { setCard } = useContext(CardContext);

    const onSelectResult = index => {
        const card = searchResults[index];
        setCard(card);
        history.push(`/cards/${card.id}`);
    };

    // TODO: Return multiple image sizes and use normal here
    return (
        <HeaderPage className='SearchResults'>
            <div className='SearchResults-content'>
                {searchResults.map((r, i) => (
                    <img key={r.id} src={r.image} alt='Card' className='SearchResults-image' onClick={() => onSelectResult(i)} />
                ))}
            </div>
        </HeaderPage>
    );
};

export default SearchResults;
