import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import Button from '../Button';
import './Paginator.scss';

function Paginator({ className = '', totalResults = 0, numberOfPages = 1, page = 1, onPageChange = () => {} }) {
    const firstEnabled = page > 1;
    const previousEnabled = page > 1;
    const nextEnabled = page < numberOfPages;
    const lastEnabled = page < numberOfPages;

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
                    <Button onClick={onFirstPageClick} disabled={!firstEnabled}>
                        <ChevronCircleLeft className='Paginator-icon Paginator-firstPageIcon' />
                        First
                    </Button>
                    <Button onClick={onPreviousPageClick} disabled={!previousEnabled}>
                        <ChevronLeft className='Paginator-icon Paginator-previousPageIcon' />
                        Previous
                    </Button>
                </div>
                <div className='Paginator-info'>
                    <div className='Paginator-infoBlock'>{`Page ${page} of ${numberOfPages}`}</div>
                    <div className='Paginator-infoBlock'>{`${totalResults} results total`}</div>
                </div>
                <div className='Paginator-buttonGroup'>
                    <Button onClick={onNextPageClick} disabled={!nextEnabled}>
                        Next
                        <ChevronRight className='Paginator-icon Paginator-nextPageIcon' />
                    </Button>
                    <Button onClick={onLastPageClick} disabled={!lastEnabled}>
                        Last
                        <ChevronCircleRight className='Paginator-icon Paginator-lastPageIcon' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Paginator;
