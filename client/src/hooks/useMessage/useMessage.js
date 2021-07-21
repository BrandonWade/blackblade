import { useContext } from 'react';
import MessageContext from '../../contexts/Message';

export const DURATION_SHORT = 3000;
export const DURATION_MEDIUM = 5000;
export const DURATION_LONG = 7000;

export default function useMessage() {
    const { setMessage, setDuration } = useContext(MessageContext);

    const showMessage = (text = '', type = 'info', duration = DURATION_SHORT) => {
        setMessage({ type, text });
        setDuration(duration);
    };

    return {
        showMessage,
    };
}
