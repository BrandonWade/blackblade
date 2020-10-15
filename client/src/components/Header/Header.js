import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import Logo from '../../components/Logo';
import Input from '../Input';
import Button from '../Button';
import Menu from '../Menu';
import './Header.scss';

const Header = () => {
    const { name, setName } = useContext(SearchContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const [menuOpen, setMenuOpen] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();

        const response = await basicSearch(name);
        displayResults(response, { name, page: 1 }, true);
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
            </div>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
    );
};

export default Header;
