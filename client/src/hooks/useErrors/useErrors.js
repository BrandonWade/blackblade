import { useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext';

const useErrors = () => {
    const { errors, setErrors } = useContext(ErrorContext);

    const addErrors = (newErrors = []) => {
        if (Array.isArray(newErrors)) {
            setErrors([...errors, ...newErrors]);
        } else if (typeof newErrors === 'string') {
            setErrors([
                ...errors,
                {
                    msg: newErrors,
                },
            ]);
        }
    };

    return {
        addErrors,
    };
};

export default useErrors;
