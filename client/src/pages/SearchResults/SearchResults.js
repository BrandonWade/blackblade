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

    return (
        <HeaderPage className='SearchResults'>
            <div className='SearchResults-content'>
                {searchResults.map((r, i) => {
                    const card = searchResults[i];
                    const cardSets = JSON.parse(card?.sets || '[]');
                    const cardSet = cardSets.length > 0 ? cardSets[0] : {};

                    return <img key={r.id} src={cardSet.image} alt='Card' className='SearchResults-image' onClick={() => onSelectResult(i)} />;
                })}
            </div>
        </HeaderPage>
    );
};

export default SearchResults;
