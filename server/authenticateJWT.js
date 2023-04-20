const jwt = require('jsonwebtoken');
const accessTokenSecret = "627795a28a0522cf4398b4015f7bffb7774441288bfe5c953953bcd7ac2f5e7a"
function authenticateJWT  (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
	const token = authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401)
	jwt.verify(token, accessTokenSecret, (err, user) => {
	    if (err) {
		return res.sendStatus(403);
	    }

	    req.user = user;
	    next();
	});
    } else {
	res.sendStatus(401);
    }
}
