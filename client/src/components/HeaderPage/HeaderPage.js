import Header from '../Header';
import './HeaderPage.scss';

function HeaderPage({ children = [], className = '' }) {
    return (
        <div className='HeaderPage'>
            <Header />
            <div className={`HeaderPage-content ${className}`}>{children}</div>
        </div>
    );
}

export default HeaderPage;
