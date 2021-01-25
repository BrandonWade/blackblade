import { MagnifyingGlass } from '../Icons';
import './NoResults.scss';

function NoResults({ showMessage = false, children = null }) {
    return (
        <>
            {showMessage ? (
                <div className='NoResults'>
                    <div className='NoResults-content'>
                        <MagnifyingGlass className='NoResults-icon' />
                        <p className='NoResults-primaryLabel'>No Results.</p>
                        <p className='NoResults-secondaryLabel'>Try searching for something else.</p>
                    </div>
                </div>
            ) : (
                children
            )}
        </>
    );
}

export default NoResults;
