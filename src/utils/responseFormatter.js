const responseFormatter = (res, statusCode, data, message) => {
    return res.status(statusCode).json({
        status: statusCode,
        message: message || null,
        data: data || null,
    });
};

module.exports = responseFormatter;