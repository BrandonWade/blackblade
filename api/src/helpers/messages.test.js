import {
    errorMessage,
    warningMessage,
    successMessage,
    infoMessage,
} from './messages';

describe('Message Helpers', () => {
    describe('errorMessage', () => {
        test('returns an error message object containing the provided text', async () => {
            const text = 'test error message';
            const message = errorMessage(text);

            expect(message.type).toBe('error');
            expect(message.text).toBe(text);
        });

        test('returns an error message object containing blank text if no text was provided', async () => {
            const message = errorMessage();

            expect(message.type).toBe('error');
            expect(message.text).toBe('');
        });
    });

    describe('warningMessage', () => {
        test('returns an warning message object containing the provided text', async () => {
            const text = 'test warning message';
            const message = warningMessage(text);

            expect(message.type).toBe('warning');
            expect(message.text).toBe(text);
        });

        test('returns an warning message object containing blank text if no text was provided', async () => {
            const message = warningMessage();

            expect(message.type).toBe('warning');
            expect(message.text).toBe('');
        });
    });

    describe('successMessage', () => {
        test('returns an success message object containing the provided text', async () => {
            const text = 'test success message';
            const message = successMessage(text);

            expect(message.type).toBe('success');
            expect(message.text).toBe(text);
        });

        test('returns an success message object containing blank text if no text was provided', async () => {
            const message = successMessage();

            expect(message.type).toBe('success');
            expect(message.text).toBe('');
        });
    });

    describe('infoMessage', () => {
        test('returns an info message object containing the provided text', async () => {
            const text = 'test info message';
            const message = infoMessage(text);

            expect(message.type).toBe('info');
            expect(message.text).toBe(text);
        });

        test('returns an info message object containing blank text if no text was provided', async () => {
            const message = infoMessage();

            expect(message.type).toBe('info');
            expect(message.text).toBe('');
        });
    });
});
