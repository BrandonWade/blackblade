export function requestMock(body = {}) {
    return {
        body,
    };
}

export function responseMock() {
    const res = {
        status: jest.fn().mockReturnValue(res),
        json: jest.fn().mockReturnValue(res),
    };

    return res;
}
