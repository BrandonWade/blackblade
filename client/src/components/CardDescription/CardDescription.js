import React from 'react';
import Card from '../Card';
import './CardDescription.scss';

const CardDescription = ({ card = {}, secondFace = null }) => {
    const renderText = cardFace => {
        const lines = cardFace.oracle_text.split('\n');
        return lines.map(l => (
            <p key={l} className='CardInfo-textBlock'>
                {l}
            </p>
        ));
    };

    const renderStatLine = cardFace => {
        let statLine;
        if (cardFace.loyalty) {
            statLine = `Loyalty: ${cardFace.loyalty}`;
        } else if (cardFace.power && cardFace.toughness) {
            statLine = `${cardFace.power} / ${cardFace.toughness}`;
        }

        return statLine ? <div className='Card-rowItem CardInfo-statLine'>{statLine}</div> : null;
    };

    return (
        <div>
            <Card className='CardInfo-description'>
                <h2 className='Card-rowItem Card-name'>
                    {card.name}
                    <span className='CardInfo-manaCost'>{card.mana_cost}</span>
                </h2>
                <div className='Card-rowItem CardInfo-type'>{card.type_line}</div>
                <div className='Card-rowItem CardInfo-text'>{renderText(card)}</div>
                {renderStatLine(card)}
            </Card>
            {secondFace ? (
                <Card className='CardInfo-description CardInfo-secondFace'>
                    <h2 className='Card-rowItem Card-name'>
                        {secondFace.name}
                        <span className='CardInfo-manaCost'>{secondFace.mana_cost}</span>
                    </h2>
                    <div className='Card-rowItem CardInfo-type'>{secondFace.type_line}</div>
                    <div className='Card-rowItem CardInfo-text'>{renderText(secondFace)}</div>
                    {renderStatLine(secondFace)}
                </Card>
            ) : null}
        </div>
    );
};

export default CardDescription;
