process.env.ENVIRONMENT = 'test';
process.env.MAILJET_PUBLIC_KEY = 'test_mj_public_key';
process.env.MAILJET_PRIVATE_KEY = 'test_mj_private_key';

global.console = {
    error: jest.fn(),
    log: console.log,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
};
