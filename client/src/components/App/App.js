import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardFaceContext from '../../contexts/CardFaceContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import Home from '../../pages/Home';
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
    const [primaryCardFace, setPrimaryCardFace] = useState({});
    const [secondaryCardFace, setSecondaryCardFace] = useState();
    const [deckName, setDeckName] = useState('Untitled Deck');
    const [deckCards, setDeckCards] = useState([]);

    return (
        <DeckBuilderContext.Provider value={{ deckName, setDeckName, deckCards, setDeckCards }}>
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
                <CardFaceContext.Provider value={{ primaryCardFace, setPrimaryCardFace, secondaryCardFace, setSecondaryCardFace }}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/cards/search' exact component={SearchResults} />
                            <Route path='/cards/:id' component={Card} />
                            <Route path='/decks' exact component={DeckCreation} />
                            <Route path='/decks/:publicID' component={DeckBuilder} />
                            <Redirect to='/' />
                        </Switch>
                    </BrowserRouter>
                </CardFaceContext.Provider>
            </SearchResultsContext.Provider>
        </DeckBuilderContext.Provider>
    );
};

export default App;
