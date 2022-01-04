export function requestMock({
    params = {},
    query = {},
    body = {},
    session = {},
    cookies = {},
}) {
    return {
        params,
        query,
        body,
        session,
        cookies,
    };
}

export function responseMock() {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.set = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);

    return res;
}

export function sessionMock() {
    const session = {};

    session.destroy = jest.fn().mockReturnValue(session);

    return session;
}

export function mailjetMock() {
    const mailjet = {};

    mailjet.post = jest.fn().mockReturnValue(mailjet);
    mailjet.request = jest.fn().mockReturnValue(mailjet);

    return mailjet;
}

export function transactionMock() {
    const tx = {};

    tx.beginTransaction = jest.fn().mockReturnValue(tx);
    tx.query = jest.fn().mockReturnValue(tx);
    tx.commit = jest.fn().mockReturnValue(tx);
    tx.rollback = jest.fn().mockReturnValue(tx);
    tx.release = jest.fn().mockReturnValue(tx);

    return tx;
}
