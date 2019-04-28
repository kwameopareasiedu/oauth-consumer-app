const axios = require("axios");

module.exports = (req, res) => {
	try {
		axios.default
			.get("http://localhost:17000/api/external/generate-request-token")
			.then(response => {
				const token = response.data.key;
				return res.json({ token });
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
