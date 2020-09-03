import React from 'react';
import Card from '../Card';
import './CardSets.scss';

const CardSets = ({ cardSets = [], selectedSetIndex = 0, setSelectedSetIndex = () => {} }) => {
    const onSelectSet = index => {
        setSelectedSetIndex(index);
    };

    return (
        <Card className='CardSets'>
            <ul className='CardSets-list'>
                {cardSets.map((set, i) => {
                    const selected = i === selectedSetIndex;

                    return (
                        <li
                            key={i}
                            className={`Card-rowItem CardSets-listItem ${selected ? 'CardSets-selectedSet' : ''}`}
                            onClick={() => onSelectSet(i)}
                        >
                            {set.set_name}
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};

export default CardSets;
