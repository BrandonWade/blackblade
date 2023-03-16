import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useBookmarks from '../../hooks/useBookmarks';
import BookmarkListContext from '../../contexts/BookmarkList';
import HeaderPage from '../../components/HeaderPage';
import CardGrid from '../../components/CardGrid/CardGrid';
import './BookmarkList.scss';

function BookmarkList({ loading = false }) {
    const { listBookmarks } = useBookmarks();
    const { bookmarkList, setBookmarkList } = useContext(BookmarkListContext);

    if (loading) {
        return (
            <HeaderPage className='BookmarkList'>
                <CardGrid loading={loading} gridClassName='BookmarkList-grid' />
            </HeaderPage>
        );
    }

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
            <CardGrid gridClassName='BookmarkList-grid' cards={bookmarkList} isLink={true} />
        </HeaderPage>
    );
}

BookmarkList.propTypes = {
    loading: PropTypes.bool,
};

export default BookmarkList;
