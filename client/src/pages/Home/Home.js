import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardContext from '../../contexts/CardContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import useSearch from '../../hooks/useSearch';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import './Home.scss';

const Home = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const { setCard, setSecondFace } = useContext(CardContext);
    const { setSearchResults } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();

    const onSubmit = async e => {
        e.preventDefault();

        // TODO: Should this be in a custom hook?
        const response = await basicSearch(query);
        if (response.success) {
            if (response?.results.length === 1) {
                const card = response.results[0];

                setCard(card);
                setSecondFace();
                history.push(`/cards/${card.id}`);
            } else if (response?.results.length === 2 && response?.results[0].card_id === response?.results[1].card_id) {
                const card = response.results[0];

                setCard(card);
                setSecondFace(response.results[1]);
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
                    <InputField className='Home-searchBox' value={query} onChange={onChange} />
                </form>
            </div>
        </div>
    );
};

export default Home;
