const KeyModel = require('../models/keyModel')

module.exports = (req, res, next) => {
    const key = req.headers['Authorization'];
    const apiKey = KeyModel.findKey(key.replace('ApiKey ', ''));

    if (apiKey && apiKey.enabled)
    return next();
        else
    res.sendStatus(401);
}