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
    const { name, setName, text, setText, page, setPage } = useContext(SearchContext);
    const { setCard } = useContext(CardContext);
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const urlParams = new URLSearchParams(props?.location?.search);
    const urlName = urlParams.get('name') || '';
    const urlText = urlParams.get('text') || '';
    const urlPage = parseInt(urlParams.get('page')) || 1;

    // If the page is loaded directly, use the name and page from the URL params
    useEffect(() => {
        let updated = false;

        if (name !== urlName) {
            setName(urlName);
            updated = true;
        }

        if (text !== urlText) {
            setText(urlText);
            updated = true;
        }

        if (page !== urlPage) {
            setPage(urlPage);
            updated = true;
        }

        if (updated) {
            fetchResults({ name: urlName, text: urlText, page: urlPage });
        }
    }, [urlName, urlText, urlPage]);

    // TODO: Handle case where &page > max pages (e.g. ?name=dragon&page=6)
    const fetchResults = async (params = {}) => {
        const response = await advancedSearch(params);
        displayResults(response, params, false);
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
