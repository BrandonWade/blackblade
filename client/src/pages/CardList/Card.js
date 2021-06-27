function Card({ cardID = 0, image = '', name = '', tags = [] }) {
    return (
        <a className='CardList-card' href={`/cards/${cardID}`}>
            <img className='CardList-cardImage' src={image} alt={name} />
            <div className='CardList-cardName'>{name}</div>
            {tags.map(tag => (
                <div key={tag.id}>{tag.text}</div>
            ))}
        </a>
    );
}

export default Card;
