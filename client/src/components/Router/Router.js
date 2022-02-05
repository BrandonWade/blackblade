import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useBookmarks from '../../hooks/useBookmarks';
import AuthContext from '../../contexts/Auth';
import BookmarkListContext from '../../contexts/BookmarkList';
import Message from '../Message';
import ConfirmDialog from '../ConfirmDialog';
import AuthenticatedRoute from '../AuthenticatedRoute';
import Home from '../../pages/Home';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
import AdvancedSearch from '../../pages/AdvancedSearch';
import Random from '../../pages/Random';
import BookmarkList from '../../pages/BookmarkList';
import SearchResults from '../../pages/SearchResults';
import Card from '../../pages/Card';
import DeckList from '../../pages/DeckList';
import DeckEditor from '../../pages/DeckEditor';
import DeckBuilder from '../../pages/DeckBuilder';
import About from '../../pages/About';
import Account from '../../pages/Account';

export default function Router() {
    const { getCSRFToken } = useAuth();
    const { listBookmarks } = useBookmarks();
    const { accountPublicID } = useContext(AuthContext);
    const { setBookmarkList } = useContext(BookmarkListContext);

    // Run any initial config needed when the app boots
    useEffect(() => {
        const setupCSRF = async () => {
            const response = await getCSRFToken();
            if (!response.success) {
                return;
            }
        };
        setupCSRF();
    }, []);

    useEffect(() => {
        const fetchBookmarkList = async () => {
            const response = await listBookmarks();
            if (!response.success) {
                return;
            }

            setBookmarkList(response.bookmarks);
        };

        if (accountPublicID) {
            fetchBookmarkList();
        }
    }, [accountPublicID]);

    return (
        <>
            <Message />
            <ConfirmDialog />
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
                    <Route path='/random' component={Random} />
                    {/* <Route path='/account' component={Account} /> */}
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
