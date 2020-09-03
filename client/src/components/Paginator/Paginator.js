import React, { useContext } from 'react';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import Button from '../Button';
import './Paginator.scss';

const Paginator = ({ className = '', onPageChange = () => {} }) => {
    const { totalResults, numberOfPages, currentPage } = useContext(SearchResultsContext);
    const firstEnabled = currentPage > 1;
    const previousEnabled = currentPage > 1;
    const nextEnabled = currentPage < numberOfPages;
    const lastEnabled = currentPage < numberOfPages;

    return (
        <div className={`Paginator ${className}`}>
            <div className='Paginator-content'>
                <div className='Paginator-buttonGroup'>
                    <Button onClick={() => onPageChange(1)} disabled={!firstEnabled}>
                        <ChevronCircleLeft className='Paginator-icon Paginator-firstPageIcon' />
                        First
                    </Button>
                    <Button onClick={() => onPageChange(currentPage - 1)} disabled={!previousEnabled}>
                        <ChevronLeft className='Paginator-icon Paginator-previousPageIcon' />
                        Previous
                    </Button>
                </div>
                <div className='Paginator-info'>
                    <div className='Paginator-infoBlock'>{`Page ${currentPage} of ${numberOfPages}`}</div>
                    <div className='Paginator-infoBlock'>{`${totalResults} results total`}</div>
                </div>
                <div className='Paginator-buttonGroup'>
                    <Button onClick={() => onPageChange(currentPage + 1)} disabled={!nextEnabled}>
                        Next
                        <ChevronRight className='Paginator-icon Paginator-nextPageIcon' />
                    </Button>
                    <Button onClick={() => onPageChange(numberOfPages)} disabled={!lastEnabled}>
                        Last
                        <ChevronCircleRight className='Paginator-icon Paginator-lastPageIcon' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Paginator;
