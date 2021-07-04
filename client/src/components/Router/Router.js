import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import MessageDialogContext from '../../contexts/MessageDialog';
import MessageDialog from '../MessageDialog';
import AuthenticatedRoute from '../AuthenticatedRoute';
import Home from '../../pages/Home';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
import AdvancedSearch from '../../pages/AdvancedSearch';
import BookmarkList from '../../pages/BookmarkList';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckList from '../../pages/DeckList';
import DeckEditor from '../../pages/DeckEditor';
import DeckBuilder from '../../pages/DeckBuilder';
import About from '../../pages/About';

function Router() {
    const { setMessage } = useContext(MessageDialogContext);
    const { getCSRFToken } = useAuth();

    // Run any initial config needed when the app boots
    useEffect(() => {
        const setupCSRF = async () => {
            const result = await getCSRFToken();
            if (!result.success) {
                setMessage(result.message);
            }
        };

        setupCSRF();
    }, []);

    return (
        <>
            <MessageDialog />
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
                    <AuthenticatedRoute path='/bookmarks' exact component={BookmarkList} />
                    <Redirect to='/' />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Router;
