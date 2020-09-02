import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardFaceContext from '../../contexts/CardFaceContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import useSearch from '../../hooks/useSearch';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import './Home.scss';

const Home = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const { setCardFace, setSecondCardFace } = useContext(CardFaceContext);
    const { setSearchResults } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();

    const onSubmit = async e => {
        e.preventDefault();

        // TODO: Should this be in a custom hook?
        const response = await basicSearch(query);
        if (response.success) {
            if (response?.results.length === 1) {
                const card = response.results[0];

                setCardFace(card);
                setSecondCardFace();
                history.push(`/cards/${card.id}`);
            } else if (response?.results.length === 2 && response?.results[0].id === response?.results[1].id) {
                const card = response.results[0];

                setCardFace(card);
                setSecondCardFace(response.results[1]);
                history.push(`/cards/${card.id}`);
            } else {
                setSearchResults(response.results);
                history.push(`/cards/search?q=${query}&page=1`);
            }
        }
    };

    const onChange = e => {
        setQuery(e.target.value);
    };

    return (
        <div className='Home'>
            <div className='Home-content'>
                <Logo size='large' />
                <form className='Home-searchForm' onSubmit={onSubmit}>
                    <Input className='Home-searchBox' value={query} onChange={onChange} />
                </form>
            </div>
        </div>
    );
};

export default Home;
