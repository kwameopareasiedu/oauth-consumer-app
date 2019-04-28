const jwt = require("jsonwebtoken");

module.exports = token => {
    return new Promise((resolve, reject) => {
        if (typeof token == "undefined") return reject({ msg: "Token not specified" });

        const tokenSecret = process.env.JWT_SECRET;

        jwt.verify(token, tokenSecret, {}, (err, decodedToken) => {
            if (err) return reject(err);
            resolve(decodedToken);
        });
    });
};
