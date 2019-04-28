const axios = require("axios");

module.exports = (req, res) => {
	const { token } = req.body;

	try {
		axios.default
			.post("http://localhost:17000/api/external/exchange-request-token-for-access-token", { oauthRequestTokenKey: token })
			.then(response => {
				const { key, secret } = response.data;
				req.session.accessKey = key;
				req.session.accessSecret = secret;
				return res.send("Authenticated");
			})
			.catch(err => {
				console.error(__filename, err);
				return res.status(500).send("An error occurred");
			});
	} catch (err) {
		console.error(__filename, err);
		return res.status(500).send("An error occurred");
	}
};
