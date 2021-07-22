import { useContext, useEffect } from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import useMessage from '../../hooks/useMessage';
import BookmarkListContext from '../../contexts/BookmarkList';
import HeaderPage from '../../components/HeaderPage';
import Bookmark from './Bookmark';
import './BookmarkList.scss';

function BookmarkList() {
    const { listBookmarks, deleteBookmark } = useBookmarks();
    const { showMessage } = useMessage();
    const { bookmarkList, setBookmarkList } = useContext(BookmarkListContext);

    useEffect(() => {
        const fetchBookmarkList = async () => {
            const response = await listBookmarks();
            if (!response?.success) {
                const { text, type } = response?.message;
                showMessage(text, type);
                return;
            }

            setBookmarkList(response.bookmarks);
        };

        fetchBookmarkList();
    }, []);

    const onRemoveBookmark = async bookmarkID => {
        const response = await deleteBookmark(bookmarkID);
        if (!response?.success) {
            const { text, type } = response?.message;
            showMessage(text, type);
            return;
        }

        setBookmarkList(bookmarkList.filter(bookmark => bookmark.id !== bookmarkID));
    };

    return (
        <HeaderPage className='BookmarkList'>
            <div className='BookmarkList-content'>
                <div className='BookmarkList-list'>
                    {bookmarkList.map(bookmark => (
                        <Bookmark
                            key={bookmark.id}
                            id={bookmark.id}
                            cardID={bookmark.card_id}
                            image={bookmark.faces_json?.[0]?.image}
                            name={bookmark.name}
                            tags={bookmark.tags}
                            onRemoveBookmark={onRemoveBookmark}
                        />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default BookmarkList;
