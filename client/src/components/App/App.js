import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import ExportDeckDialogProvider from '../../providers/ExportDeckDialog';
import DeckListProvider from '../../providers/DeckList';
import CardArtSelectorProvider from '../../providers/CardArtSelector';
import DeckBuilderProvider from '../../providers/DeckBuilder';
import AdvancedSearchProvider from '../../providers/AdvancedSearch';
import SearchProvider from '../../providers/Search';
import CardProvider from '../../providers/Card';
import AuthenticatedRoute from '../AuthenticatedRoute';
import Home from '../../pages/Home';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
import AdvancedSearch from '../../pages/AdvancedSearch';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckList from '../../pages/DeckList';
import DeckEditor from '../../pages/DeckEditor';
import DeckBuilder from '../../pages/DeckBuilder';
import About from '../../pages/About';
import './App.scss';

function App() {
    return (
        <AuthProvider>
            <ExportDeckDialogProvider>
                <DeckListProvider>
                    <CardArtSelectorProvider>
                        <DeckBuilderProvider>
                            <AdvancedSearchProvider>
                                <SearchProvider>
                                    <CardProvider>
                                        <BrowserRouter>
                                            <Switch>
                                                <Route path='/' exact component={Home} />
                                                <Route path='/register' component={Register} />
                                                <Route path='/password/forgot' component={ForgotPassword} />
                                                <Route path='/password/reset' component={ResetPassword} />
                                                <Route path='/login' component={Login} />
                                                <Route path='/logout' component={Logout} />
                                                <Route path='/about' component={About} />
                                                <Route path='/advanced' component={AdvancedSearch} />
                                                <Route path='/cards/search' exact component={SearchResults} />
                                                <Route path='/cards/:id' component={Card} />
                                                <AuthenticatedRoute path='/decks' exact component={DeckList} />
                                                <AuthenticatedRoute path='/decks/new' exact editing={false} component={DeckEditor} />
                                                <Route path='/decks/:publicID' exact component={DeckBuilder} />
                                                <AuthenticatedRoute path='/decks/:publicID/edit' exact editing={true} component={DeckEditor} />
                                                <Redirect to='/' />
                                            </Switch>
                                        </BrowserRouter>
                                    </CardProvider>
                                </SearchProvider>
                            </AdvancedSearchProvider>
                        </DeckBuilderProvider>
                    </CardArtSelectorProvider>
                </DeckListProvider>
            </ExportDeckDialogProvider>
        </AuthProvider>
    );
}

export default App;
