import { Link } from 'react-router-dom';

function CardGridImage({ card = {}, selected = false, isLink = false, onClick = () => {} }) {
    const cardFace = card?.sets_json ? card?.sets_json?.[0]?.card_faces?.[0] : card.card_faces?.[0];

    const onImageClick = () => {
        onClick(card);
    };

    const renderImage = () => {
        const image = (
            <img
                key={card.card_id}
                src={cardFace.image || ''}
                alt={cardFace.name || ''}
                className={`CardGrid-image ${selected ? 'CardGrid-selected' : ''}`}
                loading='lazy'
                onClick={onImageClick}
            />
        );

        if (isLink) {
            return <Link to={`/cards/${card.card_id}`}>{image}</Link>;
        }

        return image;
    };

    return renderImage();
}

export default CardGridImage;
