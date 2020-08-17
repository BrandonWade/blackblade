import React from 'react';
import Header from '../Header';
import './HeaderPage.scss';

const HeaderPage = ({ children = [], className = '' }) => {
    return (
        <div className='HeaderPage'>
            <Header />
            <div className={`HeaderPage-content ${className}`}>{children}</div>
        </div>
    );
};

export default HeaderPage;
