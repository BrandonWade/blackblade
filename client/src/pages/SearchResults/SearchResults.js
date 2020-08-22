import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import SearchResultContext from '../../contexts/SearchResultsContext';
import CardContext from '../../contexts/CardContext';
import HeaderPage from '../../components/HeaderPage';
import './SearchResults.scss';

const SearchResults = props => {
    const history = useHistory();
    const { searchResults, setSearchResults } = useContext(SearchResultContext);
    const { setCard } = useContext(CardContext);
    const { basicSearch } = useSearch();
    const urlParams = new URLSearchParams(props.location.search);
    const query = urlParams.get('q');

    useEffect(() => {
        const search = async () => {
            const response = await basicSearch(query);
            if (response.success) {
                if (response?.results.length == 1) {
                    const card = response.results[0];

                    setCard(card);
                    history.push(`/cards/${card.id}`);
                } else {
                    setSearchResults(response.results);
                }
            }
        };
        search();
    }, [query]);

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
