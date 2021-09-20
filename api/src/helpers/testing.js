export function requestMock({ params = {}, body = {}, session = {} }) {
    return {
        params,
        body,
        session,
    };
}

export function responseMock() {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.set = jest.fn().mockReturnValue(res);

    return res;
}
