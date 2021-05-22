export default (req, res, next) => {
    res.cookie('csrf', req.csrfToken());
    next();
};
