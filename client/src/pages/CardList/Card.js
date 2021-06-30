import CloseButton from '../../components/CloseButton';

function Card({ cardID = 0, image = '', name = '', tags = [] }) {
    return (
        <div className='CardList-cardBlock'>
            <a className='CardList-cardLink' href={`/cards/${cardID}`}>
                <img className='CardList-cardImage' src={image} alt={name} />
            </a>
            <div className='CardList-cardName'>{name}</div>
            {tags.map(tag => (
                <div key={tag.id}>{tag.text}</div>
            ))}
            <CloseButton className='CardList-removeCardButton' />
        </div>
    );
}

export default Card;
