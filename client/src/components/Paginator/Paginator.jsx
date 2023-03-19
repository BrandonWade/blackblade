import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import Button from '../Button';
import LoadingSkeleton from '../LoadingSkeleton';
import './Paginator.scss';

function Paginator({ loading = false, className = '', totalResults = 0, numberOfPages = 1, page = 1, onPageChange = () => {} }) {
    const firstEnabled = page > 1;
    const previousEnabled = page > 1;
    const nextEnabled = page < numberOfPages;
    const lastEnabled = page < numberOfPages;

    if (loading) {
        return (
            <div className={`Paginator ${className}`}>
                <div className='Paginator-content'>
                    <div className='Paginator-buttonGroup'>
                        <Button loading={loading} className='Paginator-button--loading' />
                        <Button loading={loading} className='Paginator-button--loading' />
                    </div>
                    <div className='Paginator-info'>
                        <LoadingSkeleton className='Paginator-infoBlock Paginator-infoBlock--loading' />
                        <LoadingSkeleton className='Paginator-infoBlock Paginator-infoBlock--loading' />
                    </div>
                    <div className='Paginator-buttonGroup'>
                        <Button loading={loading} className='Paginator-button--loading' />
                        <Button loading={loading} className='Paginator-button--loading' />
                    </div>
                </div>
            </div>
        );
    }

    const onFirstPageClick = () => {
        onPageChange(1);
    };

    const onPreviousPageClick = () => {
        onPageChange(page - 1);
    };

    const onNextPageClick = () => {
        onPageChange(page + 1);
    };

    const onLastPageClick = () => {
        onPageChange(numberOfPages);
    };

    return (
        <div className={`Paginator ${className}`}>
            <div className='Paginator-content'>
                <div className='Paginator-buttonGroup'>
                    <Button className='Paginator-button' disabled={!firstEnabled} onClick={onFirstPageClick}>
                        <ChevronCircleLeft className='Paginator-icon Paginator-firstPageIcon' />
                        First
                    </Button>
                    <Button className='Paginator-button' disabled={!previousEnabled} onClick={onPreviousPageClick}>
                        <ChevronLeft className='Paginator-icon Paginator-previousPageIcon' />
                        Previous
                    </Button>
                </div>
                <div className='Paginator-info'>
                    <div className='Paginator-infoBlock'>{`Page ${page} of ${numberOfPages}`}</div>
                    <div className='Paginator-infoBlock'>{`${totalResults} results total`}</div>
                </div>
                <div className='Paginator-buttonGroup'>
                    <Button className='Paginator-button' disabled={!nextEnabled} onClick={onNextPageClick}>
                        Next
                        <ChevronRight className='Paginator-icon Paginator-nextPageIcon' />
                    </Button>
                    <Button className='Paginator-button' disabled={!lastEnabled} onClick={onLastPageClick}>
                        Last
                        <ChevronCircleRight className='Paginator-icon Paginator-lastPageIcon' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

Paginator.propTypes = {
    loading: PropTypes.bool,
    className: PropTypes.string,
    totalResults: PropTypes.number,
    numberOfPages: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func,
};

export default Paginator;
