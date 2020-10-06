import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardContext from '../../contexts/CardContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import AdvancedSearchContext, { colorInitialState } from '../../contexts/AdvancedSearchContext';
import Home from '../../pages/Home';
import AdvancedSearch from '../../pages/AdvancedSearch';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckCreation from '../../pages/DeckCreation';
import DeckBuilder from '../../pages/DeckBuilder';
import './App.scss';

const App = () => {
    const [query, setQuery] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [card, setCard] = useState({});
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]);
    const [unmodifiedDeckCards, setUnmodifiedDeckCards] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [colors, setColors] = useState(colorInitialState);
    const [manaCost, setManaCost] = useState('');

    return (
        <AdvancedSearchContext.Provider value={{ name, setName, text, setText, type, setType, colors, setColors, manaCost, setManaCost }}>
            <DeckBuilderContext.Provider value={{ deckName, setDeckName, deckCards, setDeckCards, unmodifiedDeckCards, setUnmodifiedDeckCards }}>
                <SearchResultsContext.Provider
                    value={{
                        query,
                        setQuery,
                        totalResults,
                        setTotalResults,
                        searchResults,
                        setSearchResults,
                        numberOfPages,
                        setNumberOfPages,
                        currentPage,
                        setCurrentPage,
                    }}
                >
                    <CardContext.Provider value={{ card, setCard }}>
                        <BrowserRouter>
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/advanced' exact component={AdvancedSearch} />
                                <Route path='/cards/search' exact component={SearchResults} />
                                <Route path='/cards/:id' component={Card} />
                                <Route path='/decks' exact component={DeckCreation} />
                                <Route path='/decks/:publicID' component={DeckBuilder} />
                                <Redirect to='/' />
                            </Switch>
                        </BrowserRouter>
                    </CardContext.Provider>
                </SearchResultsContext.Provider>
            </DeckBuilderContext.Provider>
        </AdvancedSearchContext.Provider>
    );
};

export default App;
