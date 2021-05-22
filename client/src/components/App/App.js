import AuthProvider from '../../providers/Auth';
import MessageDialogProvider from '../../providers/MessageDialog';
import ExportDeckDialogProvider from '../../providers/ExportDeckDialog';
import DeckListProvider from '../../providers/DeckList';
import CardArtSelectorProvider from '../../providers/CardArtSelector';
import DeckBuilderProvider from '../../providers/DeckBuilder';
import AdvancedSearchProvider from '../../providers/AdvancedSearch';
import SearchProvider from '../../providers/Search';
import CardProvider from '../../providers/Card';
import Router from '../Router';
import './App.scss';

function App() {
    return (
        <AuthProvider>
            <MessageDialogProvider>
                <ExportDeckDialogProvider>
                    <DeckListProvider>
                        <CardArtSelectorProvider>
                            <DeckBuilderProvider>
                                <AdvancedSearchProvider>
                                    <SearchProvider>
                                        <CardProvider>
                                            <Router />
                                        </CardProvider>
                                    </SearchProvider>
                                </AdvancedSearchProvider>
                            </DeckBuilderProvider>
                        </CardArtSelectorProvider>
                    </DeckListProvider>
                </ExportDeckDialogProvider>
            </MessageDialogProvider>
        </AuthProvider>
    );
}

export default App;
