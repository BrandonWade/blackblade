import { Link } from 'react-router-dom';
import useMenuItems from '../../hooks/useMenuItems';
import Button from '../Button';
import Backdrop from '../Backdrop';
import XButton from '../XButton';
import './Menu.scss';

export default function Menu({ menuOpen = false, setMenuOpen = () => {} }) {
    const menuItems = useMenuItems();

    const openMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <Button className='Menu-openButton' onClick={openMenu}>
                <span className='Menu-openIcon' />
            </Button>
            <Backdrop className='Menu' visible={menuOpen}>
                <XButton className='Menu-closeButton' onClick={closeMenu} />
                <ul className='Menu-links'>
                    {menuItems.map(item =>
                        item.renderInPanelMenu ? (
                            <li key={item.text} className='Menu-link' onClick={closeMenu}>
                                <Link to={item.to}>{item.text}</Link>
                            </li>
                        ) : null
                    )}
                </ul>
            </Backdrop>
        </>
    );
}
