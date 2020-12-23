import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import useRandomCard from '../../hooks/useRandomCard';
import SearchContext from '../../contexts/Search';
import { Documents } from '../Icons';
import Logo from '../Logo';
import Input from '../Input';
import Button from '../Button';
import Menu from '../Menu';
import './Header.scss';

function Header() {
    const { name, setName } = useContext(SearchContext);
    const { searchCards } = useSearch();
    const { displayResults } = useDisplayResults();
    const { displayRandomCard } = useRandomCard();
    const [menuOpen, setMenuOpen] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();

        const params = { name };
        const response = await searchCards(params);
        displayResults(response, params, true);
    };

    const onChange = e => {
        setName(e.target.value);
    };

    return (
        <div className='Header'>
            <div className='Header-content'>
                <Logo className='Header-logo' />
                <form className='Header-searchForm' onSubmit={onSubmit}>
                    <Input placeholder='Search' className='Header-searchBox' value={name} onChange={onChange} />
                </form>
            </div>
            <div className='Header-linksContainer'>
                <Link to='/advanced'>
                    <Button className='Header-link'>Advanced Search</Button>
                </Link>
                <Link to='/decks'>
                    <Button className='Header-link'>Deck Builder</Button>
                </Link>
                <Button className='Header-link' onClick={displayRandomCard}>
                    Random Card
                </Button>
                <Link to='/about'>
                    <Button className='Header-link'>About</Button>
                </Link>
            </div>
            <span className='Header-randomCard'>
                <Documents className='Header-randomIcon' onClick={displayRandomCard} />
            </span>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
    );
}

export default Header;
