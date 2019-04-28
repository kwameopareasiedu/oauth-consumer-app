const jwt = require("jsonwebtoken");

module.exports = (token, secret) => {
    return new Promise((resolve, reject) => {
        if (typeof token == "undefined") return reject({ msg: "Token not specified" });

        jwt.verify(token, secret, {}, (err, decodedToken) => {
            if (err) return reject(err);
            return resolve(decodedToken);
        });
    });
};
