const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/env');

exports.ensureAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload === null) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: "El token ha expirado" });
    }
    req.user = payload.id;
    next();
}
