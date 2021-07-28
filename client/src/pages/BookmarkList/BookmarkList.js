import { useContext, useEffect } from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import useMessage from '../../hooks/useMessage';
import BookmarkListContext from '../../contexts/BookmarkList';
import HeaderPage from '../../components/HeaderPage';
import CardGrid from '../../components/CardGrid/CardGrid';
import './BookmarkList.scss';

function BookmarkList() {
    const { listBookmarks } = useBookmarks();
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

    return (
        <HeaderPage className='BookmarkList'>
            <CardGrid className='BookmarkList-grid' cards={bookmarkList} isLink={true} />
        </HeaderPage>
    );
}

export default BookmarkList;
