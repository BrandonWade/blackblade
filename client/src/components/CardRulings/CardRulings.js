import React from 'react';
import CardRuling from './CardRuling';
import './CardRulings.scss';

const CardRulings = props => {
    const rulings = props.rulings || [];

    return rulings.length > 0 ? (
        <div className='CardRulings'>
            {rulings.map(ruling => {
                return <CardRuling key={ruling.id} comment={ruling.comment} publishedAt={ruling.published_at} />;
            })}
        </div>
    ) : null;
};

export default CardRulings;
