import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import Card from '../Card';
import './CardDescription.scss';

const CardDescription = () => {
    const { card } = useContext(CardContext);

    const renderText = () => {
        const lines = card.oracle_text.split('\n');
        return lines.map(l => (
            <p key={l} className='CardInfo-textBlock'>
                {l}
            </p>
        ));
    };

    const renderStatLine = () => {
        let statLine;
        if (card.loyalty) {
            statLine = `Loyalty: ${card.loyalty}`;
        } else if (card.power && card.toughness) {
            statLine = `${card.power} / ${card.toughness}`;
        }

        return statLine ? <div className='Card-rowItem CardInfo-statLine'>{statLine}</div> : null;
    };

    return (
        <Card className='CardInfo-description'>
            <h2 className='Card-rowItem Card-name'>
                {card.name}
                <span className='CardInfo-manaCost'>{card.mana_cost}</span>
            </h2>
            <div className='Card-rowItem CardInfo-type'>{card.type_line}</div>
            <div className='Card-rowItem CardInfo-text'>{renderText()}</div>
            {renderStatLine()}
        </Card>
    );
};

export default CardDescription;
