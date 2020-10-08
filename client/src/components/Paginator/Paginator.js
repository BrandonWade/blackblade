import React, { useContext } from 'react';
import SearchContext from '../../contexts/SearchContext';
import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import Button from '../Button';
import './Paginator.scss';

const Paginator = ({ className = '', onPageChange = () => {} }) => {
    const { totalResults, numberOfPages, page } = useContext(SearchContext);
    const firstEnabled = page > 1;
    const previousEnabled = page > 1;
    const nextEnabled = page < numberOfPages;
    const lastEnabled = page < numberOfPages;

    return (
        <div className={`Paginator ${className}`}>
            <div className='Paginator-content'>
                <div className='Paginator-buttonGroup'>
                    <Button onClick={() => onPageChange(1)} disabled={!firstEnabled}>
                        <ChevronCircleLeft className='Paginator-icon Paginator-firstPageIcon' />
                        First
                    </Button>
                    <Button onClick={() => onPageChange(page - 1)} disabled={!previousEnabled}>
                        <ChevronLeft className='Paginator-icon Paginator-previousPageIcon' />
                        Previous
                    </Button>
                </div>
                <div className='Paginator-info'>
                    <div className='Paginator-infoBlock'>{`Page ${page} of ${numberOfPages}`}</div>
                    <div className='Paginator-infoBlock'>{`${totalResults} results total`}</div>
                </div>
                <div className='Paginator-buttonGroup'>
                    <Button onClick={() => onPageChange(page + 1)} disabled={!nextEnabled}>
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
