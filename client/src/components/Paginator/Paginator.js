import React, { useContext } from 'react';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import Button from '../Button';
import './Paginator.scss';

const Paginator = ({ className = '', onPageChange = () => {} }) => {
    const { numberOfPages, currentPage } = useContext(SearchResultsContext);
    const firstEnabled = currentPage > 1;
    const previousEnabled = currentPage > 1;
    const nextEnabled = currentPage < numberOfPages;
    const lastEnabled = currentPage < numberOfPages;

    return (
        <div className={`Paginator ${className}`}>
            <div className='Paginator-content'>
                <Button className={`Paginator-firstButton`} onClick={() => onPageChange(1)} disabled={!firstEnabled}>
                    <ChevronCircleLeft className='Paginator-firstPageIcon' />
                    First
                </Button>
                <Button className={`Paginator-previousButton`} onClick={() => onPageChange(currentPage - 1)} disabled={!previousEnabled}>
                    <ChevronLeft className='Paginator-previousPageIcon' />
                    Previous
                </Button>
                <Button className={`Paginator-nextButton`} onClick={() => onPageChange(currentPage + 1)} disabled={!nextEnabled}>
                    Next
                    <ChevronRight className='Paginator-nextPageIcon' />
                </Button>
                <Button className={`Paginator-lastButton`} onClick={() => onPageChange(numberOfPages)} disabled={!lastEnabled}>
                    Last
                    <ChevronCircleRight className='Paginator-lastPageIcon' />
                </Button>
            </div>
        </div>
    );
};

export default Paginator;
