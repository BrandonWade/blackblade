import React from 'react';
import { MagnifyingGlass } from '../Icons';
import './NoResults.scss';

const NoResults = () => {
    return (
        <div className='NoResults'>
            <div className='NoResults-content'>
                <MagnifyingGlass className='NoResults-icon' />
                <p className='NoResults-primaryLabel'>No Results.</p>
                <p className='NoResults-secondaryLabel'>Try searching for something else.</p>
            </div>
        </div>
    );
};

export default NoResults;
