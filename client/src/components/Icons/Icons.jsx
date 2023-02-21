import './Icons.scss';

export function ChevronLeft({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M12.141 13.418c0.268 0.271 0.268 0.709 0 0.978s-0.701 0.272-0.969 0l-3.83-3.908c-0.268-0.27-0.268-0.707 0-0.979l3.83-3.908c0.267-0.27 0.701-0.27 0.969 0s0.268 0.709 0 0.978l-3.141 3.421 3.141 3.418z'></path>
            </svg>
        </span>
    );
}

export function ChevronRight({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M11 10l-3.141-3.42c-0.268-0.27-0.268-0.707 0-0.978 0.268-0.27 0.701-0.27 0.969 0l3.83 3.908c0.268 0.271 0.268 0.709 0 0.979l-3.83 3.908c-0.267 0.272-0.701 0.27-0.969 0s-0.268-0.707 0-0.978l3.141-3.419z'></path>
            </svg>
        </span>
    );
}

export function ChevronCircleLeft({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M11.302 6.776c-0.196-0.197-0.515-0.197-0.71 0l-2.807 2.865c-0.196 0.199-0.196 0.52 0 0.717l2.807 2.864c0.195 0.199 0.514 0.198 0.71 0 0.196-0.197 0.196-0.518 0-0.717l-2.302-2.505 2.302-2.506c0.196-0.198 0.196-0.518 0-0.718zM10 0.4c-5.302 0-9.6 4.298-9.6 9.6 0 5.303 4.298 9.6 9.6 9.6s9.6-4.297 9.6-9.6c0-5.302-4.298-9.6-9.6-9.6zM10 18.354c-4.615 0-8.354-3.74-8.354-8.354s3.739-8.354 8.354-8.354c4.613 0 8.354 3.74 8.354 8.354s-3.741 8.354-8.354 8.354z'></path>
            </svg>
        </span>
    );
}

export function ChevronCircleRight({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M11 10l-2.302-2.506c-0.196-0.198-0.196-0.519 0-0.718 0.196-0.197 0.515-0.197 0.71 0l2.807 2.864c0.196 0.199 0.196 0.52 0 0.717l-2.807 2.864c-0.195 0.199-0.514 0.198-0.71 0-0.196-0.197-0.196-0.518 0-0.717l2.302-2.504zM10 0.4c5.302 0 9.6 4.298 9.6 9.6 0 5.303-4.298 9.6-9.6 9.6s-9.6-4.297-9.6-9.6c0-5.302 4.298-9.6 9.6-9.6zM10 18.354c4.613 0 8.354-3.74 8.354-8.354s-3.741-8.354-8.354-8.354c-4.615 0-8.354 3.74-8.354 8.354s3.739 8.354 8.354 8.354z'></path>
            </svg>
        </span>
    );
}

export function ChevronThinRight({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M13.25 10l-7.141-7.42c-0.268-0.27-0.268-0.707 0-0.979 0.268-0.27 0.701-0.27 0.969 0l7.83 7.908c0.268 0.271 0.268 0.709 0 0.979l-7.83 7.908c-0.268 0.271-0.701 0.27-0.969 0s-0.268-0.707 0-0.979l7.141-7.417z'></path>
            </svg>
        </span>
    );
}

export function ChevronThinDown({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M17.418 6.109c0.272-0.268 0.709-0.268 0.979 0s0.271 0.701 0 0.969l-7.908 7.83c-0.27 0.268-0.707 0.268-0.979 0l-7.908-7.83c-0.27-0.268-0.27-0.701 0-0.969s0.709-0.268 0.979 0l7.419 7.141 7.418-7.141z'></path>
            </svg>
        </span>
    );
}

export function ChevronThinUp({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M2.582 13.891c-0.272 0.268-0.709 0.268-0.979 0s-0.271-0.701 0-0.969l7.908-7.83c0.27-0.268 0.707-0.268 0.979 0l7.908 7.83c0.27 0.268 0.27 0.701 0 0.969s-0.709 0.268-0.978 0l-7.42-7.141-7.418 7.141z'></path>
            </svg>
        </span>
    );
}

export function RotateCW({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M19.315 10h-2.372v-0.205c-0.108-4.434-3.724-7.996-8.169-7.996-4.515 0-8.174 3.672-8.174 8.201s3.659 8.199 8.174 8.199c1.898 0 3.645-0.65 5.033-1.738l-1.406-1.504c-1.016 0.748-2.27 1.193-3.627 1.193-3.386 0-6.131-2.754-6.131-6.15s2.745-6.15 6.131-6.15c3.317 0 6.018 2.643 6.125 5.945v0.205h-2.672l3.494 3.894 3.594-3.894z'></path>
            </svg>
        </span>
    );
}

export function RotateCCW({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M0.685 10h2.372v-0.205c0.108-4.434 3.724-7.996 8.169-7.996 4.515 0 8.174 3.672 8.174 8.201s-3.659 8.199-8.174 8.199c-1.898 0-3.645-0.65-5.033-1.738l1.406-1.504c1.016 0.748 2.27 1.193 3.627 1.193 3.386 0 6.131-2.754 6.131-6.15s-2.745-6.15-6.131-6.15c-3.317 0-6.018 2.643-6.125 5.945v0.205h2.672l-3.494 3.894-3.594-3.894z'></path>
            </svg>
        </span>
    );
}

export function FlipRotate({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M5.516 14.224c-2.262-2.432-2.222-6.244 0.128-8.611 0.962-0.969 2.164-1.547 3.414-1.736l-0.069-2.077c-1.755 0.213-3.452 0.996-4.797 2.351-3.149 3.17-3.187 8.289-0.123 11.531l-1.741 1.752 5.51 0.301-0.015-5.834-2.307 2.323zM12.163 2.265l0.015 5.834 2.307-2.322c2.262 2.434 2.222 6.246-0.128 8.611-0.961 0.969-2.164 1.547-3.414 1.736l0.069 2.076c1.755-0.213 3.452-0.996 4.798-2.35 3.148-3.172 3.186-8.291 0.122-11.531l1.741-1.754-5.51-0.3z'></path>
            </svg>
        </span>
    );
}

export function Documents({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M19.398 7.415l-7.444-1.996-1.303-4.861c-0.109-0.406-0.545-0.642-0.973-0.529l-9.076 2.432c-0.428 0.114-0.686 0.538-0.577 0.944l3.23 12.051c0.109 0.406 0.544 0.643 0.971 0.527l3.613-0.967-0.492 1.838c-0.109 0.406 0.149 0.83 0.577 0.943l8.11 2.174c0.428 0.115 0.862-0.121 0.972-0.529l2.97-11.084c0.108-0.406-0.15-0.83-0.578-0.943zM1.633 3.631l7.83-2.096 2.898 10.818-7.83 2.096-2.898-10.818zM15.678 18.463l-6.814-1.863 0.536-2.002 3.901-1.047c0.428-0.113 0.688-0.537 0.578-0.943l-1.508-5.627 5.947 1.631-2.64 9.851z'></path>
            </svg>
        </span>
    );
}

export function MagnifyingGlass({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z'></path>
            </svg>
        </span>
    );
}

export function Pencil({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M14.69 2.661c-1.894-1.379-3.242-1.349-3.754-1.266-0.144 0.023-0.265 0.106-0.35 0.223l-6.883 9.497c-0.277 0.382-0.437 0.836-0.462 1.307l-0.296 5.624c-0.021 0.405 0.382 0.698 0.76 0.553l5.256-2.010c0.443-0.17 0.828-0.465 1.106-0.849l6.88-9.494c0.089-0.123 0.125-0.273 0.1-0.423-0.084-0.526-0.487-1.802-2.357-3.162zM8.977 15.465l-2.043 0.789c-0.080 0.031-0.169 0.006-0.221-0.062-0.263-0.335-0.576-0.667-1.075-1.030-0.499-0.362-0.911-0.558-1.31-0.706-0.080-0.030-0.131-0.106-0.126-0.192l0.122-2.186 0.549-0.755c0 0 1.229-0.169 2.833 0.998 1.602 1.166 1.821 2.388 1.821 2.388l-0.55 0.756z'></path>
            </svg>
        </span>
    );
}

export function Image({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M19 2h-18c-0.553 0-1 0.447-1 1v14c0 0.552 0.447 1 1 1h18c0.553 0 1-0.448 1-1v-14c0-0.552-0.447-1-1-1zM18 16h-16v-12h16v12zM14.315 10.877l-3.231 1.605-3.77-6.101-3.314 7.619h12l-1.685-3.123zM13.25 9c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25-1.25 0.56-1.25 1.25 0.56 1.25 1.25 1.25z'></path>
            </svg>
        </span>
    );
}

export function Images({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M17.125 6.17l-2.046-5.635c-0.151-0.416-0.595-0.637-0.989-0.492l-13.598 4.963c-0.394 0.144-0.593 0.597-0.441 1.013l2.156 5.941v-3.183c0-1.438 1.148-2.607 2.56-2.607h3.593l4.285-3.008 2.479 3.008h2.001zM19.238 8h-14.471c-0.42 0-0.762 0.334-0.762 0.777v9.42c0.001 0.444 0.343 0.803 0.762 0.803h14.471c0.42 0 0.762-0.359 0.762-0.803v-9.42c0-0.443-0.342-0.777-0.762-0.777zM18 17h-12v-2l1.984-4.018 2.768 3.436 2.598-2.662 3.338-1.205 1.312 3.449v3z'></path>
            </svg>
        </span>
    );
}

export function ArrowUp({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M10 2.5l6.5 6.5h-3.5v8h-6v-8h-3.5l6.5-6.5z'></path>
            </svg>
        </span>
    );
}

export function ArrowDown({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M10 17.5l-6.5-6.5h3.5v-8h6v8h3.5l-6.5 6.5z'></path>
            </svg>
        </span>
    );
}

export function Eye({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M10 4.4c-6.561 0-10 4.832-10 5.6 0 0.766 3.439 5.6 10 5.6s10-4.834 10-5.6c0-0.768-3.44-5.6-10-5.6zM10 14.307c-2.455 0-4.445-1.928-4.445-4.307s1.99-4.309 4.445-4.309c2.455 0 4.444 1.93 4.444 4.309s-1.989 4.307-4.444 4.307zM10 10c-0.407-0.447 0.663-2.154 0-2.154-1.228 0-2.223 0.965-2.223 2.154s0.995 2.154 2.223 2.154c1.227 0 2.223-0.965 2.223-2.154 0-0.547-1.877 0.379-2.223 0z'></path>
            </svg>
        </span>
    );
}

export function Block({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M10 0.4c-5.303 0-9.601 4.298-9.601 9.6 0 5.303 4.298 9.601 9.601 9.601 5.301 0 9.6-4.298 9.6-9.601s-4.299-9.6-9.6-9.6zM2.399 10c0-4.197 3.402-7.6 7.6-7.6 1.829 0 3.506 0.647 4.817 1.723l-10.694 10.694c-1.076-1.312-1.723-2.988-1.723-4.817zM9.999 17.599c-1.828 0-3.505-0.646-4.815-1.722l10.694-10.693c1.075 1.312 1.722 2.987 1.722 4.816 0 4.197-3.404 7.599-7.601 7.599z'></path>
            </svg>
        </span>
    );
}

export function Check({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z'></path>
            </svg>
        </span>
    );
}

export function Cross({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
            </svg>
        </span>
    );
}

export function Export({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M9 13h2v-9h2l-3-4-3 4h2v9zM17 7h-3v2h2v9h-12v-9h2v-2h-3c-0.553 0-1 0.447-1 1v11c0 0.552 0.447 1 1 1h14c0.553 0 1-0.448 1-1v-11c0-0.552-0.447-1-1-1z'></path>
            </svg>
        </span>
    );
}

export function Copy({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M11 0h-8c-0.553 0-1 0.447-1 1v12c0 0.552 0.447 1 1 1h5v2h2v-2h-1.999v-2h1.999v-2h-2v2h-4v-10h6v4h2v-5c0-0.552-0.447-1-1-1zM8 7v1h2v-2h-1c-0.553 0-1 0.447-1 1zM12 20h2v-2h-2v2zM12 8h2v-2h-2v2zM8 19c0 0.552 0.447 1 1 1h1v-2h-2v1zM17 6h-1v2h2v-1c0-0.552-0.447-1-1-1zM16 20h1c0.553 0 1-0.448 1-1v-1h-2v2zM16 12h2v-2h-2v2zM16 16h2v-2h-2v2z'></path>
            </svg>
        </span>
    );
}

export function Download({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M19.059 10.898l-3.171-7.927c-0.234-0.587-0.802-0.971-1.434-0.971h-2.434l0.38 4.065h2.7l-5.1 4.228-5.1-4.228h2.7l0.38-4.065h-2.434c-0.632 0-1.2 0.384-1.434 0.971l-3.171 7.927c-0.288 0.721-0.373 1.507-0.246 2.272l0.59 3.539c0.124 0.745 0.768 1.291 1.523 1.291h14.383c0.755 0 1.399-0.546 1.523-1.291l0.59-3.539c0.129-0.765 0.044-1.551-0.245-2.272zM16.959 15.245c-0.072 0.436-0.449 0.755-0.891 0.755h-12.136c-0.442 0-0.819-0.319-0.891-0.755l-0.365-2.193c-0.093-0.551 0.332-1.052 0.891-1.052h12.867c0.558 0 0.983 0.501 0.891 1.052l-0.366 2.193z'></path>
            </svg>
        </span>
    );
}

export function StarEmpty({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M18.8 8.022h-6.413l-2.387-6.722-2.389 6.722h-6.412l5.232 3.947-1.871 6.929 5.44-4.154 5.438 4.154-1.869-6.929 5.231-3.947zM10 12.783l-3.014 2.5 1.243-3.562-2.851-2.3 3.522 0.101 1.1-4.040 1.099 4.040 3.521-0.101-2.851 2.3 1.243 3.562-3.012-2.5z'></path>
            </svg>
        </span>
    );
}

export function StarFilled({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M10 1.3l2.388 6.722h6.412l-5.232 3.948 1.871 6.928-5.439-4.154-5.438 4.154 1.87-6.928-5.233-3.948h6.412l2.389-6.722z'></path>
            </svg>
        </span>
    );
}

export function QuestionMark({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M14.090 2.233c-1.14-0.822-2.572-1.233-4.296-1.233-1.311 0-2.418 0.289-3.317 0.868-1.427 0.906-2.185 2.445-2.277 4.615h3.307c0-0.633 0.185-1.24 0.553-1.828 0.369-0.586 0.995-0.879 1.878-0.879 0.898 0 1.517 0.238 1.854 0.713 0.339 0.477 0.508 1.004 0.508 1.582 0 0.504-0.252 0.965-0.557 1.383-0.167 0.244-0.387 0.469-0.661 0.674 0 0-1.793 1.15-2.58 2.074-0.456 0.535-0.497 1.338-0.538 2.488-0.002 0.082 0.029 0.252 0.315 0.252s2.316 0 2.571 0c0.256 0 0.309-0.189 0.312-0.274 0.018-0.418 0.064-0.633 0.141-0.875 0.144-0.457 0.538-0.855 0.979-1.199l0.91-0.627c0.822-0.641 1.477-1.166 1.767-1.578 0.494-0.676 0.842-1.51 0.842-2.5-0.001-1.615-0.571-2.832-1.711-3.656zM9.741 14.924c-1.139-0.035-2.079 0.754-2.115 1.99-0.035 1.234 0.858 2.051 1.998 2.084 1.189 0.035 2.104-0.727 2.141-1.963 0.034-1.236-0.834-2.076-2.024-2.111z'></path>
            </svg>
        </span>
    );
}

export function Bookmarks({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M15 0h-4c-0.553 0-1 0.447-1 1l0.023 0.222c1.102 0 2 0.897 2 2v11.359l0.977-1.181 3 3.6v-16c0-0.553-0.447-1-1-1zM9.023 3h-4.023c-0.553 0-1 0.447-1 1v16l3-3.6 3 3.6v-16c0-0.553-0.424-1-0.977-1z'></path>
            </svg>
        </span>
    );
}

export function Hourglass({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M15.6 4.576c0-2.139 0-2.348 0-2.348 0-0.789-2.508-2.228-5.6-2.228-3.093 0-5.6 1.439-5.6 2.228 0 0 0 0.209 0 2.348 0 2.141 3.877 3.908 3.877 5.424 0 1.514-3.877 3.281-3.877 5.422s0 2.35 0 2.35c0 0.788 2.507 2.228 5.6 2.228 3.092 0 5.6-1.44 5.6-2.229 0 0 0-0.209 0-2.35s-3.877-3.908-3.877-5.422c0-1.515 3.877-3.282 3.877-5.423zM5.941 2.328c0.696-0.439 2-1.082 4.114-1.082s4.006 1.082 4.006 1.082c0.142 0.086 0.698 0.383 0.317 0.609-0.838 0.497-2.478 1.020-4.378 1.020s-3.484-0.576-4.324-1.074c-0.381-0.225 0.265-0.555 0.265-0.555zM10.501 10c0 1.193 0.996 1.961 2.051 2.986 0.771 0.748 1.826 1.773 1.826 2.435v1.328c-0.97-0.483-3.872-0.955-3.872-2.504 0-0.783-1.013-0.783-1.013 0 0 1.549-2.902 2.021-3.872 2.504v-1.328c0-0.662 1.056-1.688 1.826-2.435 1.055-1.025 2.051-1.793 2.051-2.986s-0.996-1.961-2.051-2.986c-0.771-0.75-1.826-1.775-1.826-2.438l-0.046-0.998c1.026 0.553 2.652 1.078 4.425 1.078 1.772 0 3.406-0.525 4.433-1.078l-0.055 0.998c0 0.662-1.056 1.688-1.826 2.438-1.054 1.025-2.051 1.793-2.051 2.986z'></path>
            </svg>
        </span>
    );
}

export function Warning({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M19.511 17.98l-8.907-16.632c-0.124-0.215-0.354-0.348-0.604-0.348s-0.481 0.133-0.604 0.348l-8.906 16.632c-0.121 0.211-0.119 0.471 0.005 0.68 0.125 0.211 0.352 0.34 0.598 0.34h17.814c0.245 0 0.474-0.129 0.598-0.34 0.124-0.209 0.126-0.469 0.006-0.68zM11 17h-2v-2h2v2zM11 13.5h-2v-6.5h2v6.5z'></path>
            </svg>
        </span>
    );
}

export function Shuffle({ className = '', onClick = () => {}, altText = '' }) {
    return (
        <span className={`Icon ${className}`} onClick={onClick}>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
                <title>{altText}</title>
                <path d='M15.093 6.694h0.92v2.862l3.987-4.024-3.988-4.025v2.387h-0.92c-3.694 0-5.776 2.738-7.614 5.152-1.652 2.172-3.080 4.049-5.386 4.049h-2.092v2.799h2.093c3.694 0 5.776-2.736 7.614-5.152 1.652-2.173 3.080-4.048 5.386-4.048zM5.41 8.458c0.158-0.203 0.316-0.412 0.477-0.623 0.39-0.514 0.804-1.055 1.252-1.596-1.322-1.234-2.915-2.144-5.046-2.144h-2.093v2.799h2.093c1.327 0 2.362 0.623 3.317 1.564zM16.012 13.294h-0.92c-1.407 0-2.487-0.701-3.491-1.738-0.1 0.131-0.201 0.264-0.303 0.397-0.441 0.58-0.915 1.201-1.439 1.818 1.356 1.324 3 2.324 5.232 2.324h0.92v2.398l3.989-4.025-3.988-4.025v2.851z'></path>
            </svg>
        </span>
    );
}
