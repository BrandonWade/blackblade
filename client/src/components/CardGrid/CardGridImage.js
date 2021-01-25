function CardGridImage({ card = {}, selected = false, onClick = () => {} }) {
    const cardFace = card?.sets_json ? card?.sets_json?.[0]?.card_faces?.[0] : card.card_faces?.[0];

    const onImageClick = () => {
        onClick(card);
    };

    return (
        <img
            key={card.card_id}
            src={cardFace.image || ''}
            alt={cardFace.name || ''}
            className={`CardGrid-image ${selected ? 'CardGrid-selected' : ''}`}
            onClick={onImageClick}
        />
    );
}

export default CardGridImage;
