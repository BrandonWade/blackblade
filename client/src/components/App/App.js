import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardFaceContext, { initialState as CardFaceInitialState } from '../../contexts/CardFaceContext';
import SearchResultsContext, { initialState as SearchResultsInitialState } from '../../contexts/SearchResultsContext';
import Home from '../../pages/Home';
import SearchResults from '../../pages/SearchResults';
import CardInfo from '../../pages/CardInfo';
import './App.scss';

const App = () => {
    const [searchResults, setSearchResults] = useState(SearchResultsInitialState);
    const [cardFace, setCardFace] = useState(CardFaceInitialState);
    const [secondCardFace, setSecondCardFace] = useState();

    return (
        <>
            <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
                <CardFaceContext.Provider value={{ cardFace, setCardFace, secondCardFace, setSecondCardFace }}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/cards/search' exact component={SearchResults} />
                            <Route path='/cards/:id' component={CardInfo} />
                            <Redirect to='/' />
                        </Switch>
                    </BrowserRouter>
                </CardFaceContext.Provider>
            </SearchResultsContext.Provider>
        </>
    );
};

export default App;
