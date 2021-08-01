import useSymbols from '../../hooks/useSymbols';
import CardSection from '../CardSection';
import './CardFaceDetails.scss';

function CardFaceDetails({ face = {} }) {
    const manaCost = useSymbols(face?.mana_cost || '');
    const oracleText = useSymbols(face?.oracle_text || '');

    const renderText = line =>
        line
            .split('\n')
            .map(l => `<p class='CardFaceDetails-textBlock'>${l}</p>`)
            .join('');

    const renderStatLine = () => {
        let statLine;
        if (face.loyalty) {
            statLine = `Loyalty: ${face.loyalty}`;
        } else if (face.power && face.toughness) {
            statLine = `${face.power} / ${face.toughness}`;
        }

        return statLine ? <div className='CardSection-rowItem CardFaceDetails-statLine'>{statLine}</div> : null;
    };

    return (
        <CardSection className='CardFaceDetails-description'>
            <h2 className='CardSection-rowItem CardSection-name'>
                {face.name}
                <span className='CardFaceDetails-manaCost' dangerouslySetInnerHTML={{ __html: manaCost }} />
            </h2>
            <div className='CardSection-rowItem CardFaceDetails-type'>{face.type_line}</div>
            {face.oracle_text || face.flavor_text ? (
                <div className='CardSection-rowItem CardFaceDetails-text'>
                    {face.oracle_text ? (
                        <div className='CardFaceDetails-oracleText' dangerouslySetInnerHTML={{ __html: renderText(oracleText) }} />
                    ) : null}
                    {face.flavor_text ? <p className='CardFaceDetails-flavorText'>{face.flavor_text}</p> : null}
                </div>
            ) : null}
            {renderStatLine(face)}
        </CardSection>
    );
}

export default CardFaceDetails;
