import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/CardContext';
import SearchContext from '../../contexts/SearchContext';
import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

const SearchResults = props => {
    const history = useHistory();
    const { name, setName, page, setPage } = useContext(SearchContext);
    const { setCard } = useContext(CardContext);
    const { basicSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const urlParams = new URLSearchParams(props?.location?.search);
    const urlName = urlParams.get('name') || '';
    const urlPage = parseInt(urlParams.get('page')) || 1;

    // If the page is loaded directly, use the name and page from the URL params
    useEffect(() => {
        let updated = false;

        if (name !== urlName) {
            setName(urlName);
            updated = true;
        }

        if (page !== urlPage) {
            setPage(urlPage);
            updated = true;
        }

        if (updated) {
            fetchResults(urlName, urlPage);
        }
    }, [urlName, urlPage]);

    // TODO: Handle case where &page > max pages (e.g. ?name=dragon&page=6)
    const fetchResults = async (name = '', page = 1) => {
        const response = await basicSearch(name, page);
        displayResults(response, page);
    };

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
