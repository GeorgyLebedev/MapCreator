const axios=require("axios")
const jwt = require('jsonwebtoken');
const accessTokenSecret = "627795a28a0522cf4398b4015f7bffb7774441288bfe5c953953bcd7ac2f5e7a"
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
	const token = authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401)
	jwt.verify(token, accessTokenSecret, async (err, decoded) => {
	    if (!err) {
		req.user={}
		req.user.id = decoded.id;
		next();

	    }
	    else if(err.name=="TokenExpiredError"){
	        try {
		    let newToken = (await axios({
			url: "http://localhost:1111/auth/token",
			method: 'post',
			data: {
			    token: req.cookies.jwt
			}
		    })).data.token
		    return res.json({newToken: newToken})
		}
		catch (e){
	            return res.json({msg:"Ошибка авторизации. Вы будете перенаправлены на страницу авторизации для повторного входа."})
		}
	    }
	    else return res.json({err});

	});
    } else {
	res.sendStatus(401);
    }
}
module.exports=authenticateJWT
