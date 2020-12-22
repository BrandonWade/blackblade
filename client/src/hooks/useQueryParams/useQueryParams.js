// import { useContext } from 'react';
// import SearchContext from '../../contexts/Search';

// If the page is loaded directly, use the values from the URL params
function useQueryParams() {
    // const { setName, setText, setType, setColors, setSet, setPage } = useContext(SearchContext);

    // const getStateFromQueryParams = (search = '') => {
    //     const urlParams = new URLSearchParams(search);
    //     const urlName = urlParams.get('name') || '';
    //     const urlText = urlParams.get('text') || '';
    //     const urlType = urlParams.get('type') || '';
    //     const urlWhite = urlParams.get('white') === 'true';
    //     const urlBlue = urlParams.get('blue') === 'true';
    //     const urlBlack = urlParams.get('black') === 'true';
    //     const urlRed = urlParams.get('red') === 'true';
    //     const urlGreen = urlParams.get('green') === 'true';
    //     const urlSet = urlParams.get('set') || '';
    //     const urlPage = parseInt(urlParams.get('page')) || 1;

    //     // const fetchResults = async (params = {}) => {
    //     //     const response = await searchCards(params);
    //     //     displayResults(response, params, false);
    //     // };

    //     // let updated = false;

    //     setName(urlName);
    //     setText(urlText);
    //     setType(urlType);
    //     setColors(urlWhite);
    //     setColors(urlBlue);
    //     setColors(urlBlack);
    //     setColors(urlRed);
    //     setColors(urlGreen);
    //     setSet(urlSet);
    //     setPage(urlPage);

    //     // if (updated) {
    //     //     const urlColors = { white: urlWhite, blue: urlBlue, black: urlBlack, red: urlRed, green: urlGreen };
    //     //     fetchResults({ name: urlName, text: urlText, type: urlType, colors: urlColors, page: urlPage });
    //     // }
    // };

    return {
        getStateFromQueryParams,
    };
}

export default useQueryParams;
