import { useContext } from 'react';
import ConfirmDialogContext from '../../contexts/ConfirmDialog';

export default function useConfirmDialog() {
    const { setVisible, setMessage, setOnConfirm, setOnCancel } = useContext(ConfirmDialogContext);

    const showConfirmDialog = (message = '', onConfirm = () => {}, onCancel = () => {}) => {
        setMessage(message);
        setOnConfirm(() => {
            onConfirm();
            setVisible(false);
        });
        setOnCancel(() => {
            onCancel();
            setVisible(false);
        });
        setVisible(true);
    };

    return {
        showConfirmDialog,
    };
}
