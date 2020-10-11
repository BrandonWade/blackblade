import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardContext from '../../contexts/CardContext';
import SearchContext from '../../contexts/SearchContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import Home from '../../pages/Home';
import AdvancedSearch from '../../pages/AdvancedSearch';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckCreation from '../../pages/DeckCreation';
import DeckBuilder from '../../pages/DeckBuilder';
import './App.scss';

const App = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [card, setCard] = useState({});
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]);
    const [unmodifiedDeckCards, setUnmodifiedDeckCards] = useState([]);

    return (
        <DeckBuilderContext.Provider value={{ deckName, setDeckName, deckCards, setDeckCards, unmodifiedDeckCards, setUnmodifiedDeckCards }}>
            <SearchContext.Provider
                value={{
                    name,
                    setName,
                    text,
                    setText,
                    type,
                    setType,
                    page,
                    setPage,
                    totalResults,
                    setTotalResults,
                    searchResults,
                    setSearchResults,
                    numberOfPages,
                    setNumberOfPages,
                }}
            >
                <CardContext.Provider value={{ card, setCard }}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/advanced' component={AdvancedSearch} />
                            <Route path='/cards/search' exact component={SearchResults} />
                            <Route path='/cards/:id' component={Card} />
                            <Route path='/decks' exact component={DeckCreation} />
                            <Route path='/decks/:publicID' component={DeckBuilder} />
                            <Redirect to='/' />
                        </Switch>
                    </BrowserRouter>
                </CardContext.Provider>
            </SearchContext.Provider>
        </DeckBuilderContext.Provider>
    );
};

export default App;
