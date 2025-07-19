const jwt = require("jsonwebtoken");
const jwtsecret = "iamagoodboy";
const getuserDetail = (req, res, next) => {
	//Getting The Id From auth-token Attched At The req.header

	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "Access Denied" });
	}

	// Verifying The Token Usin jwtsecret

	try {
		const data = jwt.verify(token, jwtsecret);
		req.user = data.user;
		next();
	} catch (error) {
		res.status(401).send({ error: "Access okay Denied" });
	}
};

module.exports = getuserDetail;
