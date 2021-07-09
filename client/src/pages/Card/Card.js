import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/Card';
import HeaderPage from '../../components/HeaderPage';
import NoResults from '../../components/NoResults';
import CardImage from '../../components/CardImage';
import CardFace from '../../components/CardFace';
import CardSets from '../../components/CardSets';
import CardRulings from '../../components/CardRulings';
import './Card.scss';

function Card() {
    const { id } = useParams();
    const cardID = parseInt(id);
    const { getCardByID } = useSearch();
    const { displayCard } = useDisplayResults();
    const { card } = useContext(CardContext);
    const selectedSet = card?.sets_json?.find(set => set.card_id === cardID) || {};
    const cardFaces = selectedSet?.card_faces || [];

    useEffect(() => {
        const fetchCard = async () => {
            const response = await getCardByID(id);
            displayCard(response);
        };

        if (card.card_id !== cardID) {
            fetchCard();
        }
    }, [card.card_id, cardID, id, getCardByID, displayCard]);

    return (
        <HeaderPage className='Card'>
            <NoResults showMessage={isEmpty(card)}>
                <div className='Card-mainContent'>
                    <CardImage cardID={cardID} cardFaces={selectedSet.card_faces} layout={card.layout} />
                    <div>
                        {cardFaces?.map(face => {
                            return <CardFace key={face.face_id} face={face} />;
                        })}
                    </div>
                    <CardSets cardSets={card.sets_json} currentCardID={cardID} />
                </div>
                <div className='Card-secondaryContent'>
                    <CardRulings rulings={card.rulings_json} />
                </div>
            </NoResults>
        </HeaderPage>
    );
}

export default Card;
