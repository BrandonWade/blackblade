import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useDisplayResults from '../../hooks/useDisplayResults';
import useRandomCard from '../../hooks/useRandomCard';
import SearchContext from '../../contexts/Search';
import AuthContext from '../../contexts/Auth';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './Home.scss';

function Home() {
    const [query, setQuery] = useState('');
    const { setName } = useContext(SearchContext);
    const { authenticated } = useContext(AuthContext);
    const { searchResultsRedirect } = useDisplayResults();
    const { displayRandomCard } = useRandomCard();

    const onSubmit = async e => {
        e.preventDefault();

        setName(query);
        searchResultsRedirect({ name: query });
    };

    const onChange = e => {
        setQuery(e.target.value);
    };

    const renderDeckBuilderLink = () => {
        return authenticated ? (
            <Link className='Home-linkItem' to='/decks/new'>
                <Button className='Home-link'>Deck Builder</Button>
            </Link>
        ) : null;
    };

    const renderLoginLink = () => {
        return !authenticated ? (
            <Link className='Home-linkItem' to='/login'>
                <Button className='Home-link'>Login</Button>
            </Link>
        ) : null;
    };

    return (
        <div className='Home'>
            <div className='Home-content'>
                <Logo size='large' />
                <form className='Home-searchForm' onSubmit={onSubmit}>
                    <Input className='Home-searchBox' value={query} onChange={onChange} />
                </form>
                <div className='Home-linksContainer'>
                    <Link className='Home-linkItem' to='/advanced'>
                        <Button className='Home-link'>Advanced Search</Button>
                    </Link>
                    {renderDeckBuilderLink()}
                    <Button className='Home-linkItem Home-link' onClick={displayRandomCard}>
                        Random Card
                    </Button>
                    {renderLoginLink()}
                </div>
            </div>
        </div>
    );
}

export default Home;
