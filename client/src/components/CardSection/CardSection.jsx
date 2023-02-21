import './CardSection.scss';

export default function CardSection({ children = [], className = '' }) {
    return <div className={`CardSection ${className}`}>{children}</div>;
}
