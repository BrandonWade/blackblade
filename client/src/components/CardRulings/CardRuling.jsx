import PropTypes from 'prop-types';
import useSymbols from '../../hooks/useSymbols';
import LoadingSkeleton from '../LoadingSkeleton';

function CardRuling({ loading = false, comment = '', publishedAt = '' }) {
    if (loading) {
        return (
            <div className='CardRulings-ruling'>
                <LoadingSkeleton className='CardRulings-publishedAt--loading' />
                <LoadingSkeleton className='CardRulings-comment--loading' />
            </div>
        );
    }

    return (
        <div className='CardRulings-ruling'>
            <div className='CardRulings-publishedAt'>{publishedAt}</div>
            <div className='CardRulings-comment' dangerouslySetInnerHTML={{ __html: useSymbols(comment) }} />
        </div>
    );
}

CardRuling.propType = {
    loading: PropTypes.bool,
    comment: PropTypes.string,
    publishedAt: PropTypes.string,
};

export default CardRuling;
