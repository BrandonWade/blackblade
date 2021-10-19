import { useContext } from 'react';
import ConfirmDialogContext from '../../contexts/ConfirmDialog';

export default function useConfirmDialog() {
    const { setVisible, setMessage, setOnConfirm, setOnCancel } = useContext(ConfirmDialogContext);

    const showConfirmDialog = (message = '', onConfirm = () => {}, onCancel = () => {}) => {
        setMessage(message);
        setOnConfirm(onConfirm);
        setOnCancel(onCancel);
        setVisible(true);
    };

    return {
        showConfirmDialog,
    };
}
