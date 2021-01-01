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
    const { setName, setText, setTypes, setColors, setColorless, setMatchType, setSet, setRarities, setPage } = useContext(SearchContext);
    const { setCard } = useContext(CardContext);
    const { searchCards } = useSearch();
    const { cardRedirect, displayResults } = useDisplayResults();
    const { search } = location;

    useEffect(() => {
        const urlParams = new URLSearchParams(search);
        const urlName = urlParams.get('name') || '';
        const urlText = urlParams.get('text') || '';
        const urlTypes = urlParams.get('types') || '';
        const urlWhite = urlParams.get('white') === 'true';
        const urlBlue = urlParams.get('blue') === 'true';
        const urlBlack = urlParams.get('black') === 'true';
        const urlRed = urlParams.get('red') === 'true';
        const urlGreen = urlParams.get('green') === 'true';
        const urlColorless = urlParams.get('colorless') === 'true';
        const urlMatchType = urlParams.get('matchType') || '';
        const urlSet = urlParams.get('set') || '';
        const urlCommon = urlParams.get('common') || '';
        const urlUncommon = urlParams.get('uncommon') || '';
        const urlRare = urlParams.get('rare') || '';
        const urlMythic = urlParams.get('mythic') || '';
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
        setTypes(urlTypes);

        // Conditional check included to preserve state when navigating back to advanced search page
        if (urlColorless) {
            setColorless(urlColorless);
        } else {
            setColors('white', urlWhite);
            setColors('blue', urlBlue);
            setColors('black', urlBlack);
            setColors('red', urlRed);
            setColors('green', urlGreen);
        }

        // urlMatchType doesn't have a safe "empty" value
        if (urlMatchType) {
            setMatchType(urlMatchType);
        }

        setRarities('common', urlCommon);
        setRarities('uncommon', urlUncommon);
        setRarities('rare', urlRare);
        setRarities('mythic', urlMythic);

        setSet(urlSet);
        setPage(urlPage);

        const urlColors = { white: urlWhite, blue: urlBlue, black: urlBlack, red: urlRed, green: urlGreen, colorless: urlColorless };
        const urlRarities = { common: urlCommon, uncommon: urlUncommon, rare: urlRare, mythic: urlMythic };
        fetchResults({
            name: urlName,
            text: urlText,
            types: urlTypes,
            colors: urlColors,
            matchType: urlMatchType,
            set: urlSet,
            rarities: urlRarities,
            page: urlPage,
        });
    }, [search]);

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
