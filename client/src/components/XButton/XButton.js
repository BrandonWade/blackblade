import Button from '../Button';
import './XButton.scss';

function XButton({ className = '', onClose = () => {} }) {
    const onClick = () => {
        onClose(false);
    };

    return (
        <Button className={`XButton ${className}`} onClick={onClick}>
            <span className='XButton-icon' />
        </Button>
    );
}

export default XButton;
