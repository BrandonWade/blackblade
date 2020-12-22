import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import useSearch from '../../hooks/useSearch';
// import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/Card';

import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

const SearchResults = ({ location }) => {
    const history = useHistory();

    const { setCard } = useContext(CardContext);
    // const { searchCards } = useSearch();
    // const { displayResults } = useDisplayResults();
    // const { search } = location;

    const onSelectResult = card => {
        setCard(card);
        history.push(`/cards/${card.card_id}`);
    };

    return (
        <HeaderPage className='SearchResults'>
            <PaginatedResults onSelectResult={onSelectResult} />
        </HeaderPage>
    );
};

export default SearchResults;
