import React from 'react';
import Card from '../Card';
import useSymbols from '../../hooks/useSymbols';
import './CardDescription.scss';

const CardDescription = ({ card = {}, secondFace = null }) => {
    const secondFaceManaCost = useSymbols(secondFace?.mana_cost || '');
    const secondFaceText = useSymbols(secondFace?.oracle_text || '');
    const renderText = line =>
        line
            .split('\n')
            .map(l => `<p class='CardInfo-textBlock'>${l}</p>`)
            .join('');

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
                    <span className='CardInfo-manaCost' dangerouslySetInnerHTML={{ __html: useSymbols(card.mana_cost) }} />
                </h2>
                <div className='Card-rowItem CardInfo-type'>{card.type_line}</div>
                <div className='Card-rowItem CardInfo-text' dangerouslySetInnerHTML={{ __html: renderText(useSymbols(card.oracle_text)) }} />
                {renderStatLine(card)}
            </Card>
            {secondFace ? (
                <Card className='CardInfo-description CardInfo-secondFace'>
                    <h2 className='Card-rowItem Card-name'>
                        {secondFace.name}
                        <span className='CardInfo-manaCost' dangerouslySetInnerHTML={{ __html: secondFaceManaCost }} />
                    </h2>
                    <div className='Card-rowItem CardInfo-type'>{secondFace.type_line}</div>
                    <div className='Card-rowItem CardInfo-text' dangerouslySetInnerHTML={{ __html: renderText(secondFaceText) }} />
                    {renderStatLine(secondFace)}
                </Card>
            ) : null}
        </div>
    );
};

export default CardDescription;
