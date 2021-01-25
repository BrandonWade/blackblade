import useSymbols from '../../hooks/useSymbols';
import CardSection from '../CardSection';
import './CardFace.scss';

function CardFace({ face = {} }) {
    const manaCost = useSymbols(face?.mana_cost || '');
    const oracleText = useSymbols(face?.oracle_text || '');

    const renderText = line =>
        line
            .split('\n')
            .map(l => `<p class='CardFace-textBlock'>${l}</p>`)
            .join('');

    const renderStatLine = () => {
        let statLine;
        if (face.loyalty) {
            statLine = `Loyalty: ${face.loyalty}`;
        } else if (face.power && face.toughness) {
            statLine = `${face.power} / ${face.toughness}`;
        }

        return statLine ? <div className='CardSection-rowItem CardFace-statLine'>{statLine}</div> : null;
    };

    return (
        <CardSection className='CardFace-description'>
            <h2 className='CardSection-rowItem CardSection-name'>
                {face.name}
                <span className='CardFace-manaCost' dangerouslySetInnerHTML={{ __html: manaCost }} />
            </h2>
            <div className='CardSection-rowItem CardFace-type'>{face.type_line}</div>
            {face.oracle_text || face.flavor_text ? (
                <div className='CardSection-rowItem CardFace-text'>
                    {face.oracle_text ? <div className='CardFace-oracleText' dangerouslySetInnerHTML={{ __html: renderText(oracleText) }} /> : null}
                    {face.flavor_text ? <p className='CardFace-flavorText'>{face.flavor_text}</p> : null}
                </div>
            ) : null}
            {renderStatLine(face)}
        </CardSection>
    );
}

export default CardFace;
