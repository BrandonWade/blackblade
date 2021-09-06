import { useState } from 'react';
import Input from '../Input';
import { Block, Eye } from '../Icons';
import './PasswordInput.scss';

export default function PasswordInput({ value = '', className = '', autoComplete = '', onChange = () => {} }) {
    const [revealed, setRevealed] = useState(false);

    const toggleRevealed = () => {
        setRevealed(!revealed);
    };

    const renderRevealIcon = () => {
        return revealed ? (
            <Block className={`PasswordInput-reveal`} onClick={toggleRevealed} />
        ) : (
            <Eye className={`PasswordInput-reveal`} onClick={toggleRevealed} />
        );
    };

    return (
        <span className='PasswordInput-container'>
            <Input
                type={revealed ? 'text' : 'password'}
                className={`PasswordInput-input ${className}`}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
            />
            {renderRevealIcon()}
        </span>
    );
}
