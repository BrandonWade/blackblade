import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import useResultsRedirect from '../../hooks/useResultsRedirect';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Logo from '../../components/Logo';
import Input from '../Input';
import './Header.scss';

const Header = () => {
    const { query, setQuery } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { resultsRedirect } = useResultsRedirect();

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(query);
        displayResults(response);
        resultsRedirect(response);
    };

    const onChange = e => {
        setQuery(e.target.value);
    };

    return (
        <div className='Header'>
            <div className='Header-content'>
                <Logo />
                <form className='Header-searchForm' onSubmit={onSubmit}>
                    <Input placeholder='Search' className='Header-searchBox' value={query} onChange={onChange} />
                </form>
            </div>
        </div>
    );
};

export default Header;
