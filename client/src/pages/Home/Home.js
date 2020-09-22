import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import './Home.scss';

const Home = () => {
    const { query, setQuery } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(query);
        displayResults(response, query, 1, true);
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
                <Link to='/decks'>
                    <Button className='Home-link'>Try out the Deck Builder!</Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
