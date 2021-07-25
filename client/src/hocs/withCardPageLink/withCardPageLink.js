import { Link } from 'react-router-dom';

function withCardPageLink(BaseComponent) {
    return props => {
        const { cardID, ...rest } = props;

        return (
            <Link to={`/cards/${cardID}`}>
                <BaseComponent cardID={cardID} {...rest} />
            </Link>
        );
    };
}

export default withCardPageLink;
