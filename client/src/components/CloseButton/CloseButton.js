import Button from '../Button';
import './CloseButton.scss';

function CloseButton({ className = '', onClose = () => {} }) {
    const onClick = () => {
        onClose(false);
    };

    return (
        <Button className={`CloseButton ${className}`} onClick={onClick}>
            <span className='CloseButton-icon' />
        </Button>
    );
}

export default CloseButton;
