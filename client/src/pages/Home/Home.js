import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import useResultsRedirect from '../../hooks/useResultsRedirect';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import './Home.scss';

const Home = () => {
    const { query, setQuery } = useContext(SearchResultsContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { resultsRedirect } = useResultsRedirect();

    const onSubmit = async e => {
        console.log('HOME SEARCH');
        e.preventDefault();

        const response = await basicSearch(query);
        displayResults(response);
        resultsRedirect(response);
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
