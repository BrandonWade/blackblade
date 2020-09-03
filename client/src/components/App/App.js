import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardFaceContext, { initialState as CardFaceInitialState } from '../../contexts/CardFaceContext';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import Home from '../../pages/Home';
import SearchResults from '../../pages/SearchResults';
import CardInfo from '../../pages/CardInfo';
import './App.scss';

const App = () => {
    const [query, setQuery] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [primaryCardFace, setPrimaryCardFace] = useState(CardFaceInitialState);
    const [secondaryCardFace, setSecondaryCardFace] = useState();

    return (
        <>
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
