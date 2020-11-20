import React from 'react';
import CardSection from '../CardSection';
import './CardSets.scss';

const CardSets = ({ cardSets = [], selectedSetIndex = 0, setSelectedSetIndex = () => {} }) => {
    const onSelectSet = index => {
        setSelectedSetIndex(index);
    };

    return cardSets.length > 0 ? (
        <CardSection className='CardSets'>
            <ul className='CardSets-list'>
                {cardSets.map((set, i) => {
                    const selected = i === selectedSetIndex;

                    return (
                        <li
                            key={i}
                            className={`CardSection-rowItem CardSets-listItem ${selected ? 'CardSets-selectedSet' : ''}`}
                            onClick={() => onSelectSet(i)}
                        >
                            <span>{set.set_name}</span>
                            <span>{set.price ? `$${set.price}` : null}</span>
                        </li>
                    );
                })}
            </ul>
        </CardSection>
    ) : null;
};

export default CardSets;
