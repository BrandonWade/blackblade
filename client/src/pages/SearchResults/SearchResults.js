import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/Card';
import SearchContext from '../../contexts/Search';
import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

function SearchResults({ location }) {
    const history = useHistory();
    const { setName, setText, setType, setColors, setSet, setPage } = useContext(SearchContext);
    const { setCard } = useContext(CardContext);
    const { searchCards } = useSearch();
    const { cardRedirect, displayResults } = useDisplayResults();
    const { search } = location;

    useEffect(() => {
        const urlParams = new URLSearchParams(search);
        const urlName = urlParams.get('name') || '';
        const urlText = urlParams.get('text') || '';
        const urlType = urlParams.get('type') || '';
        const urlWhite = urlParams.get('white') === 'true';
        const urlBlue = urlParams.get('blue') === 'true';
        const urlBlack = urlParams.get('black') === 'true';
        const urlRed = urlParams.get('red') === 'true';
        const urlGreen = urlParams.get('green') === 'true';
        const urlSet = urlParams.get('set') || '';
        const urlPage = parseInt(urlParams.get('page')) || 1;

        const fetchResults = async (params = {}) => {
            const response = await searchCards(params);

            if (response?.totalResults === 1) {
                cardRedirect(response.results[0]);
            } else {
                displayResults(response);
            }
        };

        setName(urlName);
        setText(urlText);
        setType(urlType);
        setColors('white', urlWhite);
        setColors('blue', urlBlue);
        setColors('black', urlBlack);
        setColors('red', urlRed);
        setColors('green', urlGreen);
        setSet(urlSet);
        setPage(urlPage);

        const urlColors = { white: urlWhite, blue: urlBlue, black: urlBlack, red: urlRed, green: urlGreen };
        fetchResults({ name: urlName, text: urlText, type: urlType, colors: urlColors, set: urlSet, page: urlPage });
    }, [search]);

    const onSelectResult = card => {
        setCard(card);
        history.push(`/cards/${card.card_id}`);
    };

    return (
        <HeaderPage className='SearchResults'>
            <PaginatedResults onSelectResult={onSelectResult} />
        </HeaderPage>
    );
}

export default SearchResults;
