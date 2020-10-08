import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import './Home.scss';

const Home = () => {
    const { name, setName } = useContext(SearchContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(name);
        displayResults(response, 1, true);
    };

    const onChange = e => {
        setName(e.target.value);
    };

    return (
        <div className='Home'>
            <div className='Home-content'>
                <Logo size='large' />
                <form className='Home-searchForm' onSubmit={onSubmit}>
                    <Input className='Home-searchBox' value={name} onChange={onChange} />
                </form>
                <div className='Home-linksContainer'>
                    {/* <Link to='/advanced'>
                        <Button className='Home-link'>Advanced Search</Button>
                    </Link> */}
                    <Link to='/decks'>
                        <Button className='Home-link'>Deck Builder</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
