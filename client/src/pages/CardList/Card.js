function Card({ cardID = 0, image = '', name = '', tags = [] }) {
    return (
        <a href={`/cards/${cardID}`}>
            <div>
                <img src={image} alt={name} />
                <div>{name}</div>
                <div></div>
            </div>
        </a>
    );
}

export default Card;
