import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../contexts/Search';
import useDisplayResults from '../../hooks/useDisplayResults';
import useMenuItems from '../../hooks/useMenuItems';
import useRandomCard from '../../hooks/useRandomCard';
import { Documents } from '../Icons';
import Logo from '../Logo';
import Input from '../Input';
import Menu from '../Menu';
import './Header.scss';

function Header() {
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const { setName } = useContext(SearchContext);
    const { searchResultsRedirect } = useDisplayResults();
    const menuItems = useMenuItems();
    const { displayRandomCard } = useRandomCard();

    const onSubmit = async e => {
        e.preventDefault();

        setName(query);
        searchResultsRedirect({ name: query });
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
            <div className='Header-linksContainer'>
                {menuItems.map(item =>
                    item.renderInHeader ? (
                        <Link key={item.text} className='Header-link' to={item.to} onClick={item.onClick}>
                            {item.text}
                        </Link>
                    ) : null
                )}
            </div>
            <Link className='Header-randomCard' to='/random'>
                <Documents className='Header-randomIcon' onClick={displayRandomCard} />
            </Link>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
    );
}

export default Header;
