/**
 * Global error handler
 * Catches all errors passed via next(err)
 */
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
};