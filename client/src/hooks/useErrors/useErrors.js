import { useContext, useCallback } from 'react';
import ErrorContext from '../../contexts/Error';

const useErrors = () => {
    const { setErrors } = useContext(ErrorContext);

    const addErrors = useCallback(
        (newErrors = []) => {
            if (Array.isArray(newErrors)) {
                setErrors(errors => [...errors, ...newErrors]);
            } else if (typeof newErrors === 'string') {
                setErrors(errors => [
                    ...errors,
                    {
                        msg: newErrors,
                    },
                ]);
            }
        },
        [setErrors]
    );

    return {
        addErrors,
    };
};

export default useErrors;
