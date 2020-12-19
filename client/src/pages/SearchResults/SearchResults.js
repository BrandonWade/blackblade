import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/CardContext';
import SearchContext from '../../contexts/SearchContext';
import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

const SearchResults = ({ location }) => {
    const history = useHistory();
    const { setName, setText, setType, setColors, setSet, setPage } = useContext(SearchContext);
    const { setCard } = useContext(CardContext);
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();

    /*
        TODO: This causes a duplicate request: 1 from clicking search on the advanced search page, 1 for this page loading.
        Checks may need to be added back that compare url params vs state (e.g. urlName !== name, etc) but including state
        params in the dependencies array prevents those fields (like the card name in the search box) from being updated
        (or to be more precise, causes them to update too frequently causing changes to be discarded).
    */
    // If the page is loaded directly, use the values from the URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(location?.search);
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
            const response = await advancedSearch(params);
            displayResults(response, params, false);
        };

        let updated = false;

        if (urlName !== '') {
            setName(urlName);
            updated = true;
        }

        if (urlText !== '') {
            setText(urlText);
            updated = true;
        }

        if (urlType !== '') {
            setType(urlType);
            updated = true;
        }

        if (urlWhite !== false) {
            setColors(colors => {
                return {
                    ...colors,
                    white: urlWhite,
                };
            });
            updated = true;
        }

        if (urlBlue !== false) {
            setColors(colors => {
                return {
                    ...colors,
                    blue: urlBlue,
                };
            });
            updated = true;
        }

        if (urlBlack !== false) {
            setColors(colors => {
                return {
                    ...colors,
                    black: urlBlack,
                };
            });
            updated = true;
        }

        if (urlRed !== false) {
            setColors(colors => {
                return {
                    ...colors,
                    red: urlRed,
                };
            });
            updated = true;
        }

        if (urlGreen !== false) {
            setColors(colors => {
                return {
                    ...colors,
                    green: urlGreen,
                };
            });
            updated = true;
        }

        if (urlSet !== '') {
            setSet(urlSet);
            updated = true;
        }

        if (urlPage !== 1) {
            setPage(urlPage);
            updated = true;
        }

        if (updated) {
            const urlColors = { white: urlWhite, blue: urlBlue, black: urlBlack, red: urlRed, green: urlGreen };
            fetchResults({ name: urlName, text: urlText, type: urlType, colors: urlColors, page: urlPage });
        }
    }, [location, setName, setText, setType, setColors, setSet, advancedSearch, displayResults, setPage]);

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
