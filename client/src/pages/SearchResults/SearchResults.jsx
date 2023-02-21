import { useContext, useEffect } from 'react';
import { parseIntFallback } from '../../helpers/parse';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import useSelectedTypes from '../../hooks/useSelectedTypes';
import SearchContext from '../../contexts/Search';
import HeaderPage from '../../components/HeaderPage';
import PaginatedResults from '../../components/PaginatedResults';
import './SearchResults.scss';

export default function SearchResults({ location }) {
    const {
        name,
        setName,
        text,
        setText,
        selectedTypes,
        setSelectedTypes,
        colors,
        setColors,
        setColorless,
        matchType,
        setMatchType,
        selectedSets,
        setSelectedSets,
        cmc,
        power,
        toughness,
        loyalty,
        setStat,
        rarities,
        setRarities,
        flavorText,
        setFlavorText,
        page,
        setPage,
        totalResults,
        setTotalResults,
        searchResults,
        setSearchResults,
        numberOfPages,
        setNumberOfPages,
    } = useContext(SearchContext);
    const { searchCards } = useSearch();
    const { cardRedirect, displayResults } = useDisplayResults();
    const { parseTypesFromString } = useSelectedTypes();
    const { search } = location;

    useEffect(() => {
        const urlParams = new URLSearchParams(search);
        const urlName = urlParams.get('name') || '';
        const urlText = urlParams.get('text') || '';
        const urlSelectedTypes = parseTypesFromString(urlParams.get('selectedTypes') || '');
        const urlWhite = urlParams.get('white') === 'true';
        const urlBlue = urlParams.get('blue') === 'true';
        const urlBlack = urlParams.get('black') === 'true';
        const urlRed = urlParams.get('red') === 'true';
        const urlGreen = urlParams.get('green') === 'true';
        const urlColorless = urlParams.get('colorless') === 'true';
        const urlMatchType = urlParams.get('matchType') || 'exact';
        const urlSelectedSets = urlParams.get('selectedSets')?.split(',') || [];
        const urlCMCComparator = urlParams.get('cmcComparator') || '==';
        const urlCMCValue = urlParams.get('cmcValue') || '';
        const urlPowerComparator = urlParams.get('powerComparator') || '==';
        const urlPowerValue = urlParams.get('powerValue') || '';
        const urlToughnessComparator = urlParams.get('toughnessComparator') || '==';
        const urlToughnessValue = urlParams.get('toughnessValue') || '';
        const urlLoyaltyComparator = urlParams.get('loyaltyComparator') || '==';
        const urlLoyaltyValue = urlParams.get('loyaltyValue') || '';
        const urlCommon = urlParams.get('common') || '';
        const urlUncommon = urlParams.get('uncommon') || '';
        const urlRare = urlParams.get('rare') || '';
        const urlMythic = urlParams.get('mythic') || '';
        const urlFlavorText = urlParams.get('flavorText') || '';
        const urlPage = parseIntFallback(urlParams.get('page'), 1);

        const fetchResults = async (params = {}) => {
            const response = await searchCards(params);

            if (response?.totalResults === 1) {
                cardRedirect(response.results[0]);
            } else {
                displayResults(response, setSearchResults, setNumberOfPages, setTotalResults);
            }
        };

        setName(urlName);
        setText(urlText);
        setSelectedTypes(urlSelectedTypes);

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

        setMatchType(urlMatchType);
        setSelectedSets(urlSelectedSets);
        setStat('cmc', urlCMCComparator, urlCMCValue);
        setStat('power', urlPowerComparator, urlPowerValue);
        setStat('toughness', urlToughnessComparator, urlToughnessValue);
        setStat('loyalty', urlLoyaltyComparator, urlLoyaltyValue);
        setRarities('common', urlCommon);
        setRarities('uncommon', urlUncommon);
        setRarities('rare', urlRare);
        setRarities('mythic', urlMythic);
        setFlavorText(urlFlavorText);
        setPage(urlPage);

        const urlColors = { white: urlWhite, blue: urlBlue, black: urlBlack, red: urlRed, green: urlGreen, colorless: urlColorless };
        const urlCMC = { comparator: urlCMCComparator, value: urlCMCValue };
        const urlPower = { comparator: urlPowerComparator, value: urlPowerValue };
        const urlToughness = { comparator: urlToughnessComparator, value: urlToughnessValue };
        const urlLoyalty = { comparator: urlLoyaltyComparator, value: urlLoyaltyValue };
        const urlRarities = { common: urlCommon, uncommon: urlUncommon, rare: urlRare, mythic: urlMythic };
        fetchResults({
            name: urlName,
            text: urlText,
            selectedTypes: urlSelectedTypes,
            colors: urlColors,
            matchType: urlMatchType,
            selectedSets: urlSelectedSets,
            cmc: urlCMC,
            power: urlPower,
            toughness: urlToughness,
            loyalty: urlLoyalty,
            rarities: urlRarities,
            flavorText: urlFlavorText,
            page: urlPage,
        });
    }, [search]);

    return (
        <HeaderPage className='SearchResults'>
            <PaginatedResults
                gridClassName='SearchResults-grid'
                isLink={true}
                redirect={true}
                name={name}
                text={text}
                selectedTypes={selectedTypes}
                colors={colors}
                matchType={matchType}
                selectedSets={selectedSets}
                cmc={cmc}
                power={power}
                toughness={toughness}
                loyalty={loyalty}
                rarities={rarities}
                flavorText={flavorText}
                page={page}
                totalResults={totalResults}
                setTotalResults={setTotalResults}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                numberOfPages={numberOfPages}
                setNumberOfPages={setNumberOfPages}
                setPage={setPage}
            />
        </HeaderPage>
    );
}
