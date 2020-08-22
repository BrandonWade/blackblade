import React from 'react';
import { ChevronLeft, ChevronRight, ChevronCircleLeft, ChevronCircleRight } from '../Icons';
import './Paginator.scss';

const Paginator = ({ className = '', currentPage = 0, setCurrentPage = () => {}, numPages = 0, fetchResults = () => {} }) => {
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
                <button className={`Paginator-button Paginator-firstButton`} onClick={() => onChangePage(1)} disabled={!firstEnabled}>
                    <ChevronCircleLeft className='Paginator-firstPageIcon' />
                    First
                </button>
                <button
                    className={`Paginator-button Paginator-previousButton`}
                    onClick={() => onChangePage(currentPage - 1)}
                    disabled={!previousEnabled}
                >
                    <ChevronLeft className='Paginator-previousPageIcon' />
                    Previous
                </button>
                <button className={`Paginator-button Paginator-nextButton`} onClick={() => onChangePage(currentPage + 1)} disabled={!nextEnabled}>
                    Next
                    <ChevronRight className='Paginator-nextPageIcon' />
                </button>
                <button className={`Paginator-button Paginator-lastButton`} onClick={() => onChangePage(numPages)} disabled={!lastEnabled}>
                    Last
                    <ChevronCircleRight className='Paginator-lastPageIcon' />
                </button>
            </div>
        </div>
    );
};

export default Paginator;
