import PropTypes from 'prop-types';
import useSymbols from '../../hooks/useSymbols';
import CardSection from '../CardSection';
import LoadingSkeleton from '../LoadingSkeleton';
import './CardFaceDetails.scss';

function CardFaceDetails({ loading = false, face = {} }) {
    const manaCost = useSymbols(face?.mana_cost || '');
    const oracleText = useSymbols(face?.oracle_text || '');

    if (loading) {
        return (
            <CardSection className='CardFaceDetails-description'>
                <h2 className='CardSection-rowItem '>
                    <LoadingSkeleton className='CardSection-name--loading' />
                </h2>
                <div className='CardSection-rowItem CardFaceDetails-type'>
                    <LoadingSkeleton className='CardFaceDetails-type--loading' />
                </div>
                <div className='CardSection-rowItem CardFaceDetails-text'>
                    <div className='CardFaceDetails-oracleText'>
                        <LoadingSkeleton className='CardFaceDetails-oracleText--loading' />
                        <LoadingSkeleton className='CardFaceDetails-oracleText--loading' />
                        <LoadingSkeleton className='CardFaceDetails-oracleText--loading' />
                    </div>
                    <div className='CardFaceDetails-flavorText'>
                        <LoadingSkeleton className='CardFaceDetails-flavorText--loading' />
                        <LoadingSkeleton className='CardFaceDetails-flavorText--loading' />
                    </div>
                </div>
                <div className='CardSection-rowItem CardFaceDetails-statLine'>
                    <LoadingSkeleton className='CardFaceDetails-statLine--loading' />
                </div>
            </CardSection>
        );
    }

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

CardFaceDetails.propTypes = {
    loading: PropTypes.bool,
    face: PropTypes.object,
};

export default CardFaceDetails;
