import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardContext from '../../contexts/Card';
import CardArtSelectorContext from '../../contexts/CardArtSelector';
import ErrorContext from '../../contexts/Error';
import Home from '../../pages/Home';
import AdvancedSearch from '../../pages/AdvancedSearch';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckCreation from '../../pages/DeckCreation';
import DeckBuilder from '../../pages/DeckBuilder';
import About from '../../pages/About';
import DeckBuilderProvider from '../../providers/DeckBuilder';
import SearchProvider from '../../providers/Search';
import './App.scss';

function App() {
    const [card, setCard] = useState({});
    const [artSelectorVisible, setArtSelectorVisible] = useState(false);
    const [errors, setErrors] = useState([]);

    return (
        <ErrorContext.Provider value={{ errors, setErrors }}>
            <CardArtSelectorContext.Provider value={{ artSelectorVisible, setArtSelectorVisible }}>
                <DeckBuilderProvider>
                    <SearchProvider>
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
                    </SearchProvider>
                </DeckBuilderProvider>
            </CardArtSelectorContext.Provider>
        </ErrorContext.Provider>
    );
}

export default App;
