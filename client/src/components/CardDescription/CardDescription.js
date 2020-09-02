import React from 'react';
import Card from '../Card';
import useSymbols from '../../hooks/useSymbols';
import './CardDescription.scss';

const CardDescription = ({ primaryCardFace = {}, secondaryCardFace = null }) => {
    const secondaryCardFaceManaCost = useSymbols(secondaryCardFace?.mana_cost || '');
    const secondaryCardFaceText = useSymbols(secondaryCardFace?.oracle_text || '');
    const renderText = line =>
        line
            .split('\n')
            .map(l => `<p class='CardInfo-textBlock'>${l}</p>`)
            .join('');

    const renderStatLine = primaryCardFace => {
        let statLine;
        if (primaryCardFace.loyalty) {
            statLine = `Loyalty: ${primaryCardFace.loyalty}`;
        } else if (primaryCardFace.power && primaryCardFace.toughness) {
            statLine = `${primaryCardFace.power} / ${primaryCardFace.toughness}`;
        }

        return statLine ? <div className='Card-rowItem CardInfo-statLine'>{statLine}</div> : null;
    };

    return (
        <div>
            <Card className='CardInfo-description'>
                <h2 className='Card-rowItem Card-name'>
                    {primaryCardFace.name}
                    <span className='CardInfo-manaCost' dangerouslySetInnerHTML={{ __html: useSymbols(primaryCardFace.mana_cost) }} />
                </h2>
                <div className='Card-rowItem CardInfo-type'>{primaryCardFace.type_line}</div>
                <div
                    className='Card-rowItem CardInfo-text'
                    dangerouslySetInnerHTML={{ __html: renderText(useSymbols(primaryCardFace.oracle_text)) }}
                />
                {renderStatLine(primaryCardFace)}
            </Card>
            {secondaryCardFace ? (
                <Card className='CardInfo-description CardInfo-secondaryCardFace'>
                    <h2 className='Card-rowItem Card-name'>
                        {secondaryCardFace.name}
                        <span className='CardInfo-manaCost' dangerouslySetInnerHTML={{ __html: secondaryCardFaceManaCost }} />
                    </h2>
                    <div className='Card-rowItem CardInfo-type'>{secondaryCardFace.type_line}</div>
                    <div className='Card-rowItem CardInfo-text' dangerouslySetInnerHTML={{ __html: renderText(secondaryCardFaceText) }} />
                    {renderStatLine(secondaryCardFace)}
                </Card>
            ) : null}
        </div>
    );
};

export default CardDescription;
