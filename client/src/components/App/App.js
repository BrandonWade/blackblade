import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardContext, { initialState as CardInitialState } from '../../contexts/CardContext';
import SearchResultsContext, { initialState as SearchResultsInitialState } from '../../contexts/SearchResultsContext';
import Home from '../../pages/Home';
import SearchResults from '../../pages/SearchResults';
import CardInfo from '../../pages/CardInfo';
import './App.scss';

const App = () => {
    const [searchResults, setSearchResults] = useState(SearchResultsInitialState);
    const [card, setCard] = useState(CardInitialState);

    return (
        <>
            <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
                <CardContext.Provider value={{ card, setCard }}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/cards' exact component={SearchResults} />
                            <Route path='/cards/:id' component={CardInfo} />
                            <Redirect to='/' />
                        </Switch>
                    </BrowserRouter>
                </CardContext.Provider>
            </SearchResultsContext.Provider>
        </>
    );
};

export default App;
