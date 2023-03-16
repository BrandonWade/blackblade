import PropTypes from 'prop-types';
import CardImage from '../CardImage';
import './CardGrid.scss';

function CardGrid({
    loading = false,
    className = '',
    gridClassName = '',
    heading = '',
    cards = [],
    currentCardID = 0,
    isLink = false,
    onClick = () => {},
}) {
    if (loading) {
        return (
            <div className='CardGrid'>
                <div className={`CardGrid-content ${gridClassName}`}>
                    <CardImage loading={loading} imageClassName='CardGrid-image--loading' />
                    <CardImage loading={loading} imageClassName='CardGrid-image--loading' />
                    <CardImage loading={loading} imageClassName='CardGrid-image--loading' />
                    <CardImage loading={loading} imageClassName='CardGrid-image--loading' />
                    <CardImage loading={loading} imageClassName='CardGrid-image--loading' />
                </div>
            </div>
        );
    }

    return (
        <div className={`CardGrid ${className}`}>
            {heading ? <h3 className='CardGrid-heading'>{heading}</h3> : null}
            <div className={`CardGrid-content ${gridClassName}`}>
                {cards.map((card, i) => {
                    return (
                        <CardImage
                            key={i}
                            imageClassName='CardGrid-image'
                            card={card}
                            isSelected={card.card_id === currentCardID}
                            isLink={isLink}
                            isCompact={true}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

CardGrid.propTypes = {
    loading: PropTypes.bool,
    className: PropTypes.string,
    gridClassName: PropTypes.string,
    heading: PropTypes.string,
    cards: PropTypes.array,
    currentCardID: PropTypes.number,
    isLink: PropTypes.bool,
    onClick: PropTypes.func,
};

export default CardGrid;
