import './CardSection.scss';

function CardSection({ children, className }) {
    return <div className={`CardSection ${className}`}>{children}</div>;
}

export default CardSection;
