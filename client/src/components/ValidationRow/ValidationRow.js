import { Check, Cross } from '../Icons';
import './ValidationRow.scss';

function ValidationRow({ valid = false, description = '' }) {
    const validClass = valid ? 'ValidationRow--valid' : 'ValidationRow--invalid';
    const icon = valid ? <Check className={`ValidationRow-icon ${validClass}`} /> : <Cross className={`ValidationRow-icon ${validClass}`} />;

    return (
        <div className='ValidationRow'>
            {icon}
            {description}
        </div>
    );
}

export default ValidationRow;
