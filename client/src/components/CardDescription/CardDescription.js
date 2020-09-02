import React from 'react';
import Card from '../Card';
import useSymbols from '../../hooks/useSymbols';
import './CardDescription.scss';

const CardDescription = ({ cardFace = {}, secondCardFace = null }) => {
    const secondCardFaceManaCost = useSymbols(secondCardFace?.mana_cost || '');
    const secondCardFaceText = useSymbols(secondCardFace?.oracle_text || '');
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
                    {cardFace.name}
                    <span className='CardInfo-manaCost' dangerouslySetInnerHTML={{ __html: useSymbols(cardFace.mana_cost) }} />
                </h2>
                <div className='Card-rowItem CardInfo-type'>{cardFace.type_line}</div>
                <div className='Card-rowItem CardInfo-text' dangerouslySetInnerHTML={{ __html: renderText(useSymbols(cardFace.oracle_text)) }} />
                {renderStatLine(cardFace)}
            </Card>
            {secondCardFace ? (
                <Card className='CardInfo-description CardInfo-secondCardFace'>
                    <h2 className='Card-rowItem Card-name'>
                        {secondCardFace.name}
                        <span className='CardInfo-manaCost' dangerouslySetInnerHTML={{ __html: secondCardFaceManaCost }} />
                    </h2>
                    <div className='Card-rowItem CardInfo-type'>{secondCardFace.type_line}</div>
                    <div className='Card-rowItem CardInfo-text' dangerouslySetInnerHTML={{ __html: renderText(secondCardFaceText) }} />
                    {renderStatLine(secondCardFace)}
                </Card>
            ) : null}
        </div>
    );
};

export default CardDescription;
