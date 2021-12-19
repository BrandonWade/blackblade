import AuthProvider from '../../providers/Auth';
import MessageProvider from '../../providers/Message';
import ConfirmDialogProvider from '../../providers/ConfirmDialog';
import CardImagePreviewProvider from '../../providers/CardImagePreview';
import ExportDeckDialogProvider from '../../providers/ExportDeckDialog';
import BookmarkListProvider from '../../providers/BookmarkList';
import DeckListProvider from '../../providers/DeckList';
import DeckBuilderProvider from '../../providers/DeckBuilder';
import AttributeSearchProvider from '../../providers/AttributeSearch';
import SearchProvider from '../../providers/Search';
import CardProvider from '../../providers/Card';
import Router from '../Router';
import './App.scss';

export default function App() {
    return (
        <AuthProvider>
            <MessageProvider>
                <ConfirmDialogProvider>
                    <CardImagePreviewProvider>
                        <ExportDeckDialogProvider>
                            <BookmarkListProvider>
                                <DeckListProvider>
                                    <DeckBuilderProvider>
                                        <AttributeSearchProvider>
                                            <SearchProvider>
                                                <CardProvider>
                                                    <Router />
                                                </CardProvider>
                                            </SearchProvider>
                                        </AttributeSearchProvider>
                                    </DeckBuilderProvider>
                                </DeckListProvider>
                            </BookmarkListProvider>
                        </ExportDeckDialogProvider>
                    </CardImagePreviewProvider>
                </ConfirmDialogProvider>
            </MessageProvider>
        </AuthProvider>
    );
}
