import React from 'react';
import './Icons.scss';

export const ChevronLeft = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>chevron-small-left</title>
                <path d='M12.141 13.418c0.268 0.271 0.268 0.709 0 0.978s-0.701 0.272-0.969 0l-3.83-3.908c-0.268-0.27-0.268-0.707 0-0.979l3.83-3.908c0.267-0.27 0.701-0.27 0.969 0s0.268 0.709 0 0.978l-3.141 3.421 3.141 3.418z'></path>
            </svg>
        </span>
    );
};

export const ChevronRight = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>chevron-small-right</title>
                <path d='M11 10l-3.141-3.42c-0.268-0.27-0.268-0.707 0-0.978 0.268-0.27 0.701-0.27 0.969 0l3.83 3.908c0.268 0.271 0.268 0.709 0 0.979l-3.83 3.908c-0.267 0.272-0.701 0.27-0.969 0s-0.268-0.707 0-0.978l3.141-3.419z'></path>
            </svg>
        </span>
    );
};

export const ChevronCircleLeft = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>chevron-with-circle-left</title>
                <path d='M11.302 6.776c-0.196-0.197-0.515-0.197-0.71 0l-2.807 2.865c-0.196 0.199-0.196 0.52 0 0.717l2.807 2.864c0.195 0.199 0.514 0.198 0.71 0 0.196-0.197 0.196-0.518 0-0.717l-2.302-2.505 2.302-2.506c0.196-0.198 0.196-0.518 0-0.718zM10 0.4c-5.302 0-9.6 4.298-9.6 9.6 0 5.303 4.298 9.6 9.6 9.6s9.6-4.297 9.6-9.6c0-5.302-4.298-9.6-9.6-9.6zM10 18.354c-4.615 0-8.354-3.74-8.354-8.354s3.739-8.354 8.354-8.354c4.613 0 8.354 3.74 8.354 8.354s-3.741 8.354-8.354 8.354z'></path>
            </svg>
        </span>
    );
};

export const ChevronCircleRight = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>chevron-with-circle-right</title>
                <path d='M11 10l-2.302-2.506c-0.196-0.198-0.196-0.519 0-0.718 0.196-0.197 0.515-0.197 0.71 0l2.807 2.864c0.196 0.199 0.196 0.52 0 0.717l-2.807 2.864c-0.195 0.199-0.514 0.198-0.71 0-0.196-0.197-0.196-0.518 0-0.717l2.302-2.504zM10 0.4c5.302 0 9.6 4.298 9.6 9.6 0 5.303-4.298 9.6-9.6 9.6s-9.6-4.297-9.6-9.6c0-5.302 4.298-9.6 9.6-9.6zM10 18.354c4.613 0 8.354-3.74 8.354-8.354s-3.741-8.354-8.354-8.354c-4.615 0-8.354 3.74-8.354 8.354s3.739 8.354 8.354 8.354z'></path>
            </svg>
        </span>
    );
};

export const ChevronThinRight = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>chevron-thin-right</title>
                <path d='M13.25 10l-7.141-7.42c-0.268-0.27-0.268-0.707 0-0.979 0.268-0.27 0.701-0.27 0.969 0l7.83 7.908c0.268 0.271 0.268 0.709 0 0.979l-7.83 7.908c-0.268 0.271-0.701 0.27-0.969 0s-0.268-0.707 0-0.979l7.141-7.417z'></path>
            </svg>
        </span>
    );
};

export const ChevronThinDown = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>chevron-thin-down</title>
                <path d='M17.418 6.109c0.272-0.268 0.709-0.268 0.979 0s0.271 0.701 0 0.969l-7.908 7.83c-0.27 0.268-0.707 0.268-0.979 0l-7.908-7.83c-0.27-0.268-0.27-0.701 0-0.969s0.709-0.268 0.979 0l7.419 7.141 7.418-7.141z'></path>
            </svg>
        </span>
    );
};

export const RotateCW = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>rotate-cw</title>
                <path d='M19.315 10h-2.372v-0.205c-0.108-4.434-3.724-7.996-8.169-7.996-4.515 0-8.174 3.672-8.174 8.201s3.659 8.199 8.174 8.199c1.898 0 3.645-0.65 5.033-1.738l-1.406-1.504c-1.016 0.748-2.27 1.193-3.627 1.193-3.386 0-6.131-2.754-6.131-6.15s2.745-6.15 6.131-6.15c3.317 0 6.018 2.643 6.125 5.945v0.205h-2.672l3.494 3.894 3.594-3.894z'></path>
            </svg>
        </span>
    );
};

export const RotateCCW = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>rotate-ccw</title>
                <path d='M0.685 10h2.372v-0.205c0.108-4.434 3.724-7.996 8.169-7.996 4.515 0 8.174 3.672 8.174 8.201s-3.659 8.199-8.174 8.199c-1.898 0-3.645-0.65-5.033-1.738l1.406-1.504c1.016 0.748 2.27 1.193 3.627 1.193 3.386 0 6.131-2.754 6.131-6.15s-2.745-6.15-6.131-6.15c-3.317 0-6.018 2.643-6.125 5.945v0.205h2.672l-3.494 3.894-3.594-3.894z'></path>
            </svg>
        </span>
    );
};

export const FlipRotate = ({ className = '', onClick = () => {} }) => {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>flip</title>
                <path d='M5.516 14.224c-2.262-2.432-2.222-6.244 0.128-8.611 0.962-0.969 2.164-1.547 3.414-1.736l-0.069-2.077c-1.755 0.213-3.452 0.996-4.797 2.351-3.149 3.17-3.187 8.289-0.123 11.531l-1.741 1.752 5.51 0.301-0.015-5.834-2.307 2.323zM12.163 2.265l0.015 5.834 2.307-2.322c2.262 2.434 2.222 6.246-0.128 8.611-0.961 0.969-2.164 1.547-3.414 1.736l0.069 2.076c1.755-0.213 3.452-0.996 4.798-2.35 3.148-3.172 3.186-8.291 0.122-11.531l1.741-1.754-5.51-0.3z'></path>
            </svg>
        </span>
    );
};
