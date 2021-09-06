import useFetch from '../useFetch';

export default function useBookmarks() {
    const { fetchData } = useFetch();

    const createBookmark = async (cardID = 0) => {
        const response = await fetchData('/api/bookmarks', 'POST', { cardID });
        const data = await response.json();

        switch (response.status) {
            case 200:
            case 201:
                return {
                    success: true,
                    bookmark: data.bookmark,
                };
            default:
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const listBookmarks = async () => {
        const response = await fetchData('/api/bookmarks');
        const data = await response.json();

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    bookmarks: data.bookmarks,
                };
            }
            case 401:
                return {
                    success: false,
                    message: data.message,
                };
            default: {
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    };

    const deleteBookmark = async (bookmarkID = 0) => {
        const response = await fetchData(`/api/bookmarks/${bookmarkID}`, 'DELETE');

        switch (response.status) {
            case 204:
                return {
                    success: true,
                };
            default:
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    return {
        createBookmark,
        listBookmarks,
        deleteBookmark,
    };
}
