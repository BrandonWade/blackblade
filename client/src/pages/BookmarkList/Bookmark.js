import XButton from '../../components/XButton';

function Bookmark({ id = 0, cardID = 0, image = '', name = '', tags = [], onRemoveBookmark = () => {} }) {
    const onRemoveBookmarkClick = () => {
        onRemoveBookmark(id);
    };

    return (
        <div className='BookmarkList-bookmarkBlock'>
            <a className='BookmarkList-bookmarkLink' href={`/cards/${cardID}`}>
                <img className='BookmarkList-bookmarkImage' src={image} alt={name} />
            </a>
            <div className='BookmarkList-bookmarkName'>{name}</div>
            {tags.map(tag => (
                <div key={tag.id}>{tag.text}</div>
            ))}
            <XButton className='BookmarkList-removeBookmarkButton' onClick={onRemoveBookmarkClick} />
        </div>
    );
}

export default Bookmark;
