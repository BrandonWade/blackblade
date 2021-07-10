import { Link } from 'react-router-dom';
import XButton from '../../components/XButton';

function Bookmark({ id = 0, cardID = 0, image = '', name = '', tags = [], onRemoveBookmark = () => {} }) {
    const onRemoveBookmarkClick = () => {
        onRemoveBookmark(id);
    };

    return (
        <div className='BookmarkList-bookmarkBlock'>
            <Link className='BookmarkList-bookmarkLink' to={`/cards/${cardID}`}>
                <img className='BookmarkList-bookmarkImage' src={image} alt={name} />
            </Link>
            <div className='BookmarkList-bookmarkName'>{name}</div>
            {tags.map(tag => (
                <div key={tag.id}>{tag.text}</div>
            ))}
            <XButton className='BookmarkList-removeBookmarkButton' onClick={onRemoveBookmarkClick} />
        </div>
    );
}

export default Bookmark;
