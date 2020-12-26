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
    const { name, setName, text, setText, type, setType, colors, setColors, set, setSet, page, setPage } = useContext(SearchContext);
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

        if (urlName !== name) {
            setName(urlName);
        }

        if (urlText !== text) {
            setText(urlText);
        }

        if (urlType !== type) {
            setType(urlType);
        }

        if (urlWhite !== colors['white']) {
            setColors('white', urlWhite);
        }

        if (urlBlue !== colors['blue']) {
            setColors('blue', urlBlue);
        }

        if (urlBlack !== colors['black']) {
            setColors('black', urlBlack);
        }

        if (urlRed !== colors['red']) {
            setColors('red', urlRed);
        }

        if (urlGreen !== colors['green']) {
            setColors('green', urlGreen);
        }

        if (urlSet !== set) {
            setSet(urlSet);
        }

        if (urlPage !== page) {
            setPage(urlPage);
        }
    }, [search, name, setName, text, setText, type, setType, colors, setColors, set, setSet, page, setPage]);

    useEffect(() => {
        const fetchResults = async (params = {}) => {
            const response = await searchCards(params);

            if (response?.totalResults === 1) {
                cardRedirect(response.results[0]);
            } else {
                displayResults(response);
            }
        };

        fetchResults({ name, text, type, colors, set, page });
    }, [
        // cardRedirect,
        // displayResults,
        // searchCards,
        name,
        text,
        type,
        colors,
        set,
        page,
    ]);

    const onSelectResult = card => {
        setCard(card);
        history.push(`/cards/${card.card_id}`);
    };

    return (
        <HeaderPage className='SearchResults'>
            <PaginatedResults onSelectResult={onSelectResult} redirect={true} />
        </HeaderPage>
    );
}

export default SearchResults;
