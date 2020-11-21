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
    const { name, setName, text, setText, type, setType, colors, setColors, page, setPage } = useContext(SearchContext);
    const { setCard } = useContext(CardContext);
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const urlParams = new URLSearchParams(props?.location?.search);
    const urlName = urlParams.get('name') || '';
    const urlText = urlParams.get('text') || '';
    const urlType = urlParams.get('type') || '';
    const urlWhite = urlParams.get('white') === 'true';
    const urlBlue = urlParams.get('blue') === 'true';
    const urlBlack = urlParams.get('black') === 'true';
    const urlRed = urlParams.get('red') === 'true';
    const urlGreen = urlParams.get('green') === 'true';
    const urlPage = parseInt(urlParams.get('page')) || 1;

    // If the page is loaded directly, use the values from the URL params
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

        if (type !== urlType) {
            setType(urlType);
            updated = true;
        }

        if (colors?.white !== urlWhite) {
            setColors({
                ...colors,
                white: urlWhite,
            });
            updated = true;
        }

        if (colors?.blue !== urlBlue) {
            setColors({
                ...colors,
                blue: urlBlue,
            });
            updated = true;
        }

        if (colors?.black !== urlBlack) {
            setColors({
                ...colors,
                black: urlBlack,
            });
            updated = true;
        }

        if (colors?.red !== urlRed) {
            setColors({
                ...colors,
                red: urlRed,
            });
            updated = true;
        }

        if (colors?.green !== urlGreen) {
            setColors({
                ...colors,
                green: urlGreen,
            });
            updated = true;
        }

        if (page !== urlPage) {
            setPage(urlPage);
            updated = true;
        }

        if (updated) {
            const urlColors = { white: urlWhite, blue: urlBlue, black: urlBlack, red: urlRed, green: urlGreen };
            fetchResults({ name: urlName, text: urlText, type: urlType, colors: urlColors, page: urlPage });
        }
    }, [urlName, urlText, urlType, urlWhite, urlBlue, urlBlack, urlRed, urlGreen, urlPage]);

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
