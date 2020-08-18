import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchResultContext from '../../contexts/SearchResultsContext';
import HeaderPage from '../../components/HeaderPage';
import './SearchResults.scss';

const SearchResults = () => {
    const { searchResults } = useContext(SearchResultContext);

    return (
        <HeaderPage className='SearchResults'>
            <div className='SearchResults-content'>
                {searchResults.map(r => (
                    <Link to={`/cards/${r.id}`}>
                        <img key={r.id} src={r.image} alt='Card' className='SearchResults-image' />
                    </Link>
                ))}
            </div>
        </HeaderPage>
    );
};

export default SearchResults;
