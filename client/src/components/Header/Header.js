import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Logo from '../../components/Logo';
import Input from '../Input';
import './Header.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Header = () => {
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
        <div className='Header'>
            <div className='Header-content'>
                <Logo className='Header-logo' />
                <form className='Header-searchForm' onSubmit={onSubmit}>
                    <Input placeholder='Search' className='Header-searchBox' value={query} onChange={onChange} />
                </form>
            </div>
            <Link to='/decks'>
                <Button className='Header-link'>Deck Builder</Button>
            </Link>
        </div>
    );
};

export default Header;
