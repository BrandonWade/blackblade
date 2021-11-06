import { useContext, useEffect } from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import BookmarkListContext from '../../contexts/BookmarkList';
import HeaderPage from '../../components/HeaderPage';
import BackgroundMessage, { NO_BOOKMARKS } from '../../components/BackgroundMessage';
import CardGrid from '../../components/CardGrid/CardGrid';
import './BookmarkList.scss';

export default function BookmarkList() {
    const { listBookmarks } = useBookmarks();
    const { bookmarkList, setBookmarkList } = useContext(BookmarkListContext);

    useEffect(() => {
        const fetchBookmarkList = async () => {
            const response = await listBookmarks();
            if (!response.success) {
                return;
            }

            setBookmarkList(response.bookmarks);
        };

        fetchBookmarkList();
    }, []);

    return (
        <HeaderPage className='BookmarkList'>
            <BackgroundMessage showMessage={bookmarkList.length === 0} type={NO_BOOKMARKS}>
                <CardGrid gridClassName='BookmarkList-grid' cards={bookmarkList} isLink={true} />
            </BackgroundMessage>
        </HeaderPage>
    );
}
