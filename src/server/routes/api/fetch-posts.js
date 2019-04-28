const axios = require("axios");
const { jwtService } = _services;

module.exports = async (req, res) => {
	try {
		const token = await jwtService.issueWithSecret({}, req.session.accessSecret);

		axios.default
			.post("http://localhost:17000/api/external/fetch-posts", { oauthAccessTokenKey: req.session.accessKey, token })
			.then(response => {
				return res.json(response.data);
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
