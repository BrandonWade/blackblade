import AuthProvider from '../../providers/Auth';
import MessageProvider from '../../providers/Message';
import CardImagePreviewProvider from '../../providers/CardImagePreview';
import ExportDeckDialogProvider from '../../providers/ExportDeckDialog';
import BookmarkListProvider from '../../providers/BookmarkList';
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
            <MessageProvider>
                <CardImagePreviewProvider>
                    <ExportDeckDialogProvider>
                        <BookmarkListProvider>
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
                        </BookmarkListProvider>
                    </ExportDeckDialogProvider>
                </CardImagePreviewProvider>
            </MessageProvider>
        </AuthProvider>
    );
}

export default App;
