import { useState } from 'react';
import ErrorContext, { initialState } from '../../contexts/Error';

function ErrorProvider({ children = [] }) {
    const [errors, setErrors] = useState(initialState);

    const props = {
        errors,
        setErrors,
    };

    return <ErrorContext.Provider value={props}>{children}</ErrorContext.Provider>;
}

export default ErrorProvider;
