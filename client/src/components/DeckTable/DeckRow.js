import { useContext } from 'react';
import CardContext from '../../contexts/Card';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckRowManaCost from './DeckRowManaCost';
import DeckRowName from './DeckRowName';
import Input from '../Input';
import { Images, ArrowUp, ArrowDown } from '../Icons';

function DeckRow({ card = {}, count = 0, sectionType = '' }) {
    const { accountPublicID } = useContext(AuthContext);
    const { setCard } = useContext(CardContext);
    const {
        deckAccountPublicID,
        updateDeckCardCount,
        removeDeckCard,
        updateMaybeboardCardCount,
        removeMaybeboardCard,
        moveToDeck,
        moveToMaybeboard,
        showCardArtSelector,
    } = useContext(DeckBuilderContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const inDeck = card.location === 'deck';
    const isMaybeboardSection = sectionType === 'maybeboard';

    const onCountChange = e => {
        const updateCardCount = inDeck ? updateDeckCardCount : updateMaybeboardCardCount;
        updateCardCount(card.card_id, e.target.value);
    };

    const onSelectArt = () => {
        setCard(card);
        showCardArtSelector();
    };

    const onSwitchSection = () => {
        const moveCard = isMaybeboardSection ? moveToDeck : moveToMaybeboard;
        moveCard(card.card_id, card.count);
    };

    const onRemoveCard = () => {
        const removeCard = inDeck ? removeDeckCard : removeMaybeboardCard;
        removeCard(card.card_id);
    };

    const renderCardCount = () => {
        return ownsDeck ? (
            <td className='DeckTable-count'>
                <Input className='DeckTable-input' value={count} onChange={onCountChange} />
            </td>
        ) : (
            <td className='DeckTable-count'>
                <p className='DeckTable-input--readonly'>{count}</p>
            </td>
        );
    };

    const renderSelectArtButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-selectArt' onClick={onSelectArt}>
                <Images className='DeckTable-selectArtIcon' altText='Select card art' />
            </td>
        ) : null;
    };

    const renderSwitchSectionButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-switchSection' onClick={onSwitchSection}>
                {isMaybeboardSection ? (
                    <ArrowUp className='DeckTable-switchSectionIcon' altText='Move to deck' />
                ) : (
                    <ArrowDown className='DeckTable-switchSectionIcon' altText='Move to maybeboard' />
                )}
            </td>
        ) : null;
    };

    const renderRemoveButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-remove' onClick={onRemoveCard}>
                &#x2715;
            </td>
        ) : null;
    };

    return (
        <tr key={card.card_id} className='DeckTable-cardRow'>
            {renderCardCount()}
            {renderSelectArtButton()}
            {renderSwitchSectionButton()}
            <td className='DeckTable-manaCosts'>
                {card.faces_json.map((face, i) => (
                    <DeckRowManaCost key={i} manaCost={face.mana_cost} />
                ))}
            </td>
            <td className='DeckTable-names'>
                {card.faces_json.map((face, i) => {
                    return <DeckRowName key={i} previewImage={face.image} cardID={card.card_id} name={face.name} image={face.image} />;
                })}
            </td>
            {renderRemoveButton()}
        </tr>
    );
}

export default DeckRow;
