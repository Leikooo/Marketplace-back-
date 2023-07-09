const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    console.log(err.message);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}

