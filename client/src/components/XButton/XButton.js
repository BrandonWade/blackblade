import Button from '../Button';
import './XButton.scss';

function XButton({ className = '', onClick = () => {} }) {
    return (
        <Button className={`XButton ${className}`} onClick={onClick}>
            <span className='XButton-icon' />
        </Button>
    );
}

export default XButton;
