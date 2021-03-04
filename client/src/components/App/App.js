import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorProvider from '../../providers/Error';
import CardArtSelectorProvider from '../../providers/CardArtSelector';
import DeckBuilderProvider from '../../providers/DeckBuilder';
import AdvancedSearchProvider from '../../providers/AdvancedSearch';
import SearchProvider from '../../providers/Search';
import CardProvider from '../../providers/Card';
import Home from '../../pages/Home';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import AdvancedSearch from '../../pages/AdvancedSearch';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckCreation from '../../pages/DeckCreation';
import DeckBuilder from '../../pages/DeckBuilder';
import About from '../../pages/About';
import './App.scss';

function App() {
    return (
        <ErrorProvider>
            <CardArtSelectorProvider>
                <DeckBuilderProvider>
                    <AdvancedSearchProvider>
                        <SearchProvider>
                            <CardProvider>
                                <BrowserRouter>
                                    <Switch>
                                        <Route path='/' exact component={Home} />
                                        {/* <Route path='/register' component={Register} /> */}
                                        {/* <Route path='/login' component={Login} /> */}
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
                            </CardProvider>
                        </SearchProvider>
                    </AdvancedSearchProvider>
                </DeckBuilderProvider>
            </CardArtSelectorProvider>
        </ErrorProvider>
    );
}

export default App;
