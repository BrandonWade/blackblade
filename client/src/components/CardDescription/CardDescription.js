import React from 'react';
import Card from '../Card';
import useSymbols from '../../hooks/useSymbols';
import './CardDescription.scss';

const CardDescription = ({ primaryCardFace = {}, secondaryCardFace = {} }) => {
    primaryCardFace.formatted_mana_cost = useSymbols(primaryCardFace?.mana_cost || '');
    primaryCardFace.formatted_oracle_text = useSymbols(primaryCardFace?.oracle_text || '');
    secondaryCardFace.formatted_mana_cost = useSymbols(secondaryCardFace?.mana_cost || '');
    secondaryCardFace.formatted_oracle_text = useSymbols(secondaryCardFace?.oracle_text || '');
    const cardFaces = [primaryCardFace];

    if (secondaryCardFace.id) {
        cardFaces.push(secondaryCardFace);
    }

    const renderText = line =>
        line
            .split('\n')
            .map(l => `<p class='CardDescription-textBlock'>${l}</p>`)
            .join('');

    const renderStatLine = primaryCardFace => {
        let statLine;
        if (primaryCardFace.loyalty) {
            statLine = `Loyalty: ${primaryCardFace.loyalty}`;
        } else if (primaryCardFace.power && primaryCardFace.toughness) {
            statLine = `${primaryCardFace.power} / ${primaryCardFace.toughness}`;
        }

        return statLine ? <div className='Card-rowItem CardDescription-statLine'>{statLine}</div> : null;
    };

    return (
        <div>
            {cardFaces.map(face => {
                return (
                    <Card className='CardDescription-description'>
                        <h2 className='Card-rowItem Card-name'>
                            {face.name}
                            <span className='CardDescription-manaCost' dangerouslySetInnerHTML={{ __html: face.formatted_mana_cost }} />
                        </h2>
                        <div className='Card-rowItem CardDescription-type'>{face.type_line}</div>
                        {face.formatted_oracle_text || face.flavor_text ? (
                            <div className='Card-rowItem CardDescription-text'>
                                {face.oracle_text ? (
                                    <div
                                        className='CardDescription-oracleText'
                                        dangerouslySetInnerHTML={{ __html: renderText(face.formatted_oracle_text) }}
                                    />
                                ) : null}
                                {face.flavor_text ? <p className='CardDescription-flavorText'>{face.flavor_text}</p> : null}
                            </div>
                        ) : null}
                        {renderStatLine(face)}
                    </Card>
                );
            })}
        </div>
    );
};

export default CardDescription;
