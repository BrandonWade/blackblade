import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useDisplayResults from '../../hooks/useDisplayResults';
import useMenuItems from '../../hooks/useMenuItems';
import SearchContext from '../../contexts/Search';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import './Home.scss';

function Home() {
    const [query, setQuery] = useState('');
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
        <div className='Home'>
            <div className='Home-content'>
                <Logo size='large' />
                <form className='Home-searchForm' onSubmit={onSubmit}>
                    <Input className='Home-searchBox' value={query} onChange={onChange} />
                </form>
                <div className='Home-linksContainer'>
                    {menuItems.map(item =>
                        item.renderOnHome ? (
                            <Link key={item.text} className='Home-link' to={item.to}>
                                {item.text}
                            </Link>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
