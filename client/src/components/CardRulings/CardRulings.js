import React from 'react';
import CardSection from '../CardSection';
import './CardRulings.scss';

const CardRulings = props => {
    const rulings = props.rulings || [];

    return rulings.length > 0 ? (
        <div className='CardRulings'>
            {rulings.map(ruling => {
                return (
                    <CardSection key={ruling.id} className='CardRulings-ruling'>
                        <div className='CardSection-rowItem CardRulings-comment'>{ruling.comment}</div>
                        <div className='CardSection-rowItem CardRulings-publishedAt'>{ruling.published_at}</div>
                    </CardSection>
                );
            })}
        </div>
    ) : null;
};

export default CardRulings;
