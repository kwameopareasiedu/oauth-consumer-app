const jwt = require("jsonwebtoken");

module.exports = (payload, expiry) => {
    return new Promise((resolve, reject) => {
        if (typeof payload == "undefined" || typeof expiry == "undefined") return reject({ message: "payload or expiry not specified" });

        const tokenSecret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, tokenSecret, { expiresIn: expiry });
        return resolve(token);
    });
};
