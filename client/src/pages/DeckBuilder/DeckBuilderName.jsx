import PropTypes from 'prop-types';
import LoadingSkeleton from '../../components/LoadingSkeleton';

function DeckBuilderName({ loading = false, name = '' }) {
    if (loading) {
        return <LoadingSkeleton className='DeckBuilder-name DeckBuilder-name--loading' />;
    }

    return <div className='DeckBuilder-name'>{name}</div>;
}

DeckBuilderName.propTypes = {
    loading: PropTypes.bool,
    name: PropTypes.string,
};

export default DeckBuilderName;
