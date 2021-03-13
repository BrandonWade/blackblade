import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorProvider from '../../providers/Error';
import AuthProvider from '../../providers/Auth';
import CardArtSelectorProvider from '../../providers/CardArtSelector';
import DeckBuilderProvider from '../../providers/DeckBuilder';
import AdvancedSearchProvider from '../../providers/AdvancedSearch';
import SearchProvider from '../../providers/Search';
import CardProvider from '../../providers/Card';
import AuthenticatedRoute from '../AuthenticatedRoute';
import Home from '../../pages/Home';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
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
            <AuthProvider>
                <CardArtSelectorProvider>
                    <DeckBuilderProvider>
                        <AdvancedSearchProvider>
                            <SearchProvider>
                                <CardProvider>
                                    <BrowserRouter>
                                        <Switch>
                                            <Route path='/' exact component={Home} />
                                            {/* <Route path='/register' component={Register} /> */}
                                            {/* <Route path='/password/forgot' component={ForgotPassword} /> */}
                                            {/* <Route path='/login' component={Login} /> */}
                                            {/* <Route path='/logout' component={Logout} /> */}
                                            <Route path='/about' component={About} />
                                            <Route path='/advanced' component={AdvancedSearch} />
                                            <Route path='/cards/search' exact component={SearchResults} />
                                            <Route path='/cards/:id' component={Card} />
                                            <AuthenticatedRoute path='/decks' exact editing={false} component={DeckCreation} />
                                            <Route path='/decks/:publicID' exact component={DeckBuilder} />
                                            <AuthenticatedRoute path='/decks/:publicID/edit' exact editing={true} component={DeckCreation} />
                                            <Redirect to='/' />
                                        </Switch>
                                    </BrowserRouter>
                                </CardProvider>
                            </SearchProvider>
                        </AdvancedSearchProvider>
                    </DeckBuilderProvider>
                </CardArtSelectorProvider>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
