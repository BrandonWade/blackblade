import React from 'react';
import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import Button from '../Button';
import './Paginator.scss';

const Paginator = ({ className = '', currentPage = 0, setCurrentPage = () => {}, numPages = 0 }) => {
    const firstEnabled = currentPage > 1;
    const previousEnabled = currentPage > 1;
    const nextEnabled = currentPage < numPages;
    const lastEnabled = currentPage < numPages;

    const onChangePage = newPage => {
        setCurrentPage(newPage);
    };

    return (
        <div className={`Paginator ${className}`}>
            <div className='Paginator-content'>
                <Button className={`Paginator-firstButton`} onClick={() => onChangePage(1)} disabled={!firstEnabled}>
                    <ChevronCircleLeft className='Paginator-firstPageIcon' />
                    First
                </Button>
                <Button className={`Paginator-previousButton`} onClick={() => onChangePage(currentPage - 1)} disabled={!previousEnabled}>
                    <ChevronLeft className='Paginator-previousPageIcon' />
                    Previous
                </Button>
                <Button className={`Paginator-nextButton`} onClick={() => onChangePage(currentPage + 1)} disabled={!nextEnabled}>
                    Next
                    <ChevronRight className='Paginator-nextPageIcon' />
                </Button>
                <Button className={`Paginator-lastButton`} onClick={() => onChangePage(numPages)} disabled={!lastEnabled}>
                    Last
                    <ChevronCircleRight className='Paginator-lastPageIcon' />
                </Button>
            </div>
        </div>
    );
};

export default Paginator;
