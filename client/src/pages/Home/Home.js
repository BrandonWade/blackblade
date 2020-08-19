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
    const { setCard } = useContext(CardContext);
    const { setSearchResults } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();

    const onSubmit = async e => {
        e.preventDefault();

        // TODO: Should this be in a custom hook?
        const response = await basicSearch(query);
        if (response.success) {
            if (response.results.length == 1) {
                const card = response.results[0];

                setCard(card);
                history.push(`/cards/${card.id}`);
            } else {
                setSearchResults(response.results);
                history.push(`/cards/search?q=${query}`);
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
