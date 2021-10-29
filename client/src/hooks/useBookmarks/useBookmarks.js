import useFetch from '../useFetch';

export default function useBookmarks() {
    const { fetchJSON } = useFetch();

    const createBookmark = async (cardID = 0) => {
        const response = await fetchJSON('/api/bookmarks', 'POST', { cardID });

        switch (response.status) {
            case 200:
            case 201:
                return {
                    success: true,
                    bookmark: response.data.bookmark,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const listBookmarks = async () => {
        const response = await fetchJSON('/api/bookmarks');

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    bookmarks: response.data.bookmarks,
                };
            }
            default: {
                return {
                    success: false,
                };
            }
        }
    };

    const deleteBookmark = async (bookmarkID = 0) => {
        const response = await fetchJSON(`/api/bookmarks/${bookmarkID}`, 'DELETE');

        switch (response.status) {
            case 204:
                return {
                    success: true,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    return {
        createBookmark,
        listBookmarks,
        deleteBookmark,
    };
}
