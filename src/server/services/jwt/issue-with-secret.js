const jwt = require("jsonwebtoken");

module.exports = (payload, secret, expiry) => {
	return new Promise((resolve, reject) => {
		if (typeof payload == "undefined") return reject({ message: "payload or expiry not specified" });

		const jwtOptions = {};

		if (expiry) jwtOptions.expiresIn = expiry;

		const token = jwt.sign(payload, secret, jwtOptions);
		return resolve(token);
	});
};
