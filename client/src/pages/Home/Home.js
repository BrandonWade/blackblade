import React from 'react';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import './Home.scss';

const Home = () => {
    return (
        <div className='Home'>
            <div className='Home-content'>
                <Logo />
                <InputField className='Home-searchBox' />
            </div>
        </div>
    );
};

export default Home;
