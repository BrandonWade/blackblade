import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../contexts/Search';
import useDisplayResults from '../../hooks/useDisplayResults';
import useMenuItems from '../../hooks/useMenuItems';
import { Shuffle } from '../Icons';
import Logo from '../Logo';
import Input from '../Input';
import Menu from '../Menu';
import './HeaderPage.scss';

export default function HeaderPage({ children = [], className = '' }) {
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const { setName } = useContext(SearchContext);
    const { searchResultsRedirect } = useDisplayResults();
    const menuItems = useMenuItems();

    const onSubmit = async e => {
        e.preventDefault();

        setName(query);
        searchResultsRedirect({ name: query });
    };

    const onChange = e => {
        setQuery(e.target.value);
    };

    return (
        <div className='HeaderPage'>
            <div className='HeaderPage-header'>
                <div className='HeaderPage-headerContent'>
                    <Logo className='HeaderPage-logo' />
                    <form className='HeaderPage-searchForm' onSubmit={onSubmit}>
                        <Input placeholder='Search by name' className='HeaderPage-searchBox' value={query} onChange={onChange} />
                    </form>
                </div>
                <div className='HeaderPage-linksContainer'>
                    {menuItems.map(item =>
                        item.renderInHeader ? (
                            <Link key={item.text} className='HeaderPage-link' to={item.to} onClick={item.onClick}>
                                {item.text}
                            </Link>
                        ) : null
                    )}
                </div>
                <Link className='HeaderPage-randomCard' to='/random'>
                    <Shuffle className='HeaderPage-randomIcon' />
                </Link>
                <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className={`HeaderPage-pageContent ${className}`}>{children}</div>
        </div>
    );
}
