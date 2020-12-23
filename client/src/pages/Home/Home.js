import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useDisplayResults from '../../hooks/useDisplayResults';
import useRandomCard from '../../hooks/useRandomCard';
import SearchContext from '../../contexts/Search';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './Home.scss';

function Home() {
    const { name, setName } = useContext(SearchContext);
    const { searchResultsRedirect } = useDisplayResults();
    const { displayRandomCard } = useRandomCard();

    const onSubmit = async e => {
        e.preventDefault();

        searchResultsRedirect({ name });
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
                    <Link to='/advanced'>
                        <Button className='Home-link'>Advanced Search</Button>
                    </Link>
                    <Link to='/decks'>
                        <Button className='Home-link'>Deck Builder</Button>
                    </Link>
                    <Button className='Home-link' onClick={displayRandomCard}>
                        Random Card
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
