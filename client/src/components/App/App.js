import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardContext from '../../contexts/CardContext';
import SearchContext, { colorInitialState } from '../../contexts/SearchContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import CardArtSelectorContext from '../../contexts/CardArtSelectorContext';
import ErrorContext from '../../contexts/ErrorContext';
import Home from '../../pages/Home';
import AdvancedSearch from '../../pages/AdvancedSearch';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckCreation from '../../pages/DeckCreation';
import DeckBuilder from '../../pages/DeckBuilder';
import About from '../../pages/About';
import './App.scss';

const App = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [colors, setColors] = useState(colorInitialState);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [card, setCard] = useState({});
    const [artSelectorVisible, setArtSelectorVisible] = useState(false);
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]);
    const [maybeboardCards, setMaybeboardCards] = useState([]);
    const [unmodifiedDeckName, setUnmodifiedDeckName] = useState('');
    const [unmodifiedDeckCards, setUnmodifiedDeckCards] = useState([]);
    const [maybeboardMode, setMaybeboardMode] = useState(false);
    const [errors, setErrors] = useState([]);

    return (
        <ErrorContext.Provider value={{ errors, setErrors }}>
            <CardArtSelectorContext.Provider value={{ artSelectorVisible, setArtSelectorVisible }}>
                <DeckBuilderContext.Provider
                    value={{
                        deckName,
                        setDeckName,
                        deckCards,
                        setDeckCards,
                        maybeboardCards,
                        setMaybeboardCards,
                        unmodifiedDeckName,
                        setUnmodifiedDeckName,
                        unmodifiedDeckCards,
                        setUnmodifiedDeckCards,
                        maybeboardMode,
                        setMaybeboardMode,
                    }}
                >
                    <SearchContext.Provider
                        value={{
                            name,
                            setName,
                            text,
                            setText,
                            type,
                            setType,
                            colors,
                            setColors,
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
                                    <Route path='/about' component={About} />
                                    <Route path='/advanced' component={AdvancedSearch} />
                                    <Route path='/cards/search' exact component={SearchResults} />
                                    <Route path='/cards/:id' component={Card} />
                                    <Route path='/decks' exact render={props => <DeckCreation {...props} editing={false} />} />
                                    <Route path='/decks/:publicID' exact component={DeckBuilder} />
                                    <Route path='/decks/:publicID/edit' exact render={props => <DeckCreation {...props} editing={true} />} />
                                    <Redirect to='/' />
                                </Switch>
                            </BrowserRouter>
                        </CardContext.Provider>
                    </SearchContext.Provider>
                </DeckBuilderContext.Provider>
            </CardArtSelectorContext.Provider>
        </ErrorContext.Provider>
    );
};

export default App;
