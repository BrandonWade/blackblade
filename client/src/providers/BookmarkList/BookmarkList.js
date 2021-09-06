import { useState } from 'react';
import BookmarkListContext, { initialState } from '../../contexts/BookmarkList';

export default function BookmarkListProvider({ children = [] }) {
    const [bookmarkList, setBookmarkList] = useState(initialState);

    const props = {
        bookmarkList,
        setBookmarkList,
    };

    return <BookmarkListContext.Provider value={props}>{children}</BookmarkListContext.Provider>;
}
