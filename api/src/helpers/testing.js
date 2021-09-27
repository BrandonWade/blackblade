export function requestMock({
    params = {},
    query = {},
    body = {},
    session = {},
}) {
    return {
        params,
        query,
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
    res.cookie = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);

    return res;
}
