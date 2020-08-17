import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardContext from '../../contexts/CardContext';
import Logo from '../../components/Logo';
import useSearch from '../../hooks/useSearch';
import InputField from '../../components/InputField';
import './Home.scss';

const Home = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const { setCard } = useContext(CardContext);
    const { basicSearch } = useSearch();

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(query);
        if (response.success) {
            if (response.results.length == 1) {
                const card = response.results[0];

                setCard(card);
                history.push(`/cards/${card.id}`);
            } else {
                // TODO: Handle when more than 1 card is returned
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
