import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import useSearch from '../../hooks/useSearch';
import useMessage from '../../hooks/useMessage';
import CardContext from '../../contexts/Card';
import HeaderPage from '../../components/HeaderPage';
import NoResults from '../../components/NoResults';
import CardImage from '../../components/CardImage';
import CardFaceDetails from '../../components/CardFaceDetails';
import CardSets from '../../components/CardSets';
import CardRulings from '../../components/CardRulings';
import './Card.scss';

function Card() {
    const { id } = useParams();
    const { showMessage } = useMessage();
    const { getCardByID } = useSearch();
    const { card, setCard } = useContext(CardContext);
    const cardID = parseInt(id);
    const cardFaces = card?.faces_json || [];

    useEffect(() => {
        return () => setCard({});
    }, []);

    useEffect(() => {
        const fetchCard = async () => {
            const response = await getCardByID(id);
            if (!response?.success) {
                const { text, type } = response?.message;
                setCard({});
                showMessage(text, type);
                return;
            }

            if (response.results.length) {
                const [card] = response?.results;
                setCard(card);
                return;
            }

            setCard({});
        };

        if (card.card_id !== cardID) {
            fetchCard();
        }
    }, [id]);

    return (
        <HeaderPage className='Card'>
            <NoResults showMessage={isEmpty(card)}>
                <div className='Card-mainContent'>
                    <CardImage card={card} />
                    <div>
                        {cardFaces?.map(face => {
                            return <CardFaceDetails key={face.face_id} face={face} />;
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
