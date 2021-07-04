import { useContext, useEffect } from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import BookmarkListContext from '../../contexts/BookmarkList';
import HeaderPage from '../../components/HeaderPage';
import Bookmark from './Bookmark';
import './BookmarkList.scss';

function BookmarkList() {
    const { listBookmarks, deleteBookmark } = useBookmarks();
    const { bookmarkList, setBookmarkList } = useContext(BookmarkListContext);

    useEffect(() => {
        const fetchBookmarkList = async () => {
            const result = await listBookmarks();
            if (!result.success) {
                return;
            }

            setBookmarkList(result.bookmarks);
        };

        fetchBookmarkList();
    }, []);

    const onRemoveBookmark = async bookmarkID => {
        const result = await deleteBookmark(bookmarkID);
        if (!result.success) {
            return;
        }

        setBookmarkList(bookmarkList.filter(bookmark => bookmark.bookmark_id !== bookmarkID));
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
                            image={bookmark.image}
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
