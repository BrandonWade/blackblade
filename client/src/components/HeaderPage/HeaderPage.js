import Header from '../Header';
import './HeaderPage.scss';

export default function HeaderPage({ children = [], className = '' }) {
    return (
        <div className='HeaderPage'>
            <Header />
            <div className={`HeaderPage-content ${className}`}>{children}</div>
        </div>
    );
}
