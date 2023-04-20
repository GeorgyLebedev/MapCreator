const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const accessTokenSecret = '627795a28a0522cf4398b4015f7bffb7774441288bfe5c953953bcd7ac2f5e7a';
const refreshTokenSecret = '06e757eb1716c3e2ca29d166143c5846efb598e99dac4cde149d2a11cd16c1bf';
const bcrypt = require('bcryptjs')

let refreshTokens = [];
router.post('/login', async (req, res) => {
    let query=await userModel.find({email:req.body.email})
    if (query && query.length > 0 && await bcrypt.compare(req.body.password, query[0].password)) {
	const accessToken = jwt.sign({ username: req.body.email }, accessTokenSecret , { expiresIn: '10m' });
	const refreshToken = jwt.sign({ username:  req.body.email }, refreshTokenSecret);
	refreshTokens.push(refreshToken);
	res.cookie('jwt', refreshToken, { httpOnly: true,
	    sameSite: false, secure: false,
	    maxAge: 24 * 60 * 60 * 1000 });
	res.json({token: accessToken, user: query[0].email, id: query[0]._id });
    }
    else {
	res.json({msg:'Неправильный логин или пароль!'});
    }
});

router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
	return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
	return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
	if (err) {
	    return res.sendStatus(403);
	}

	const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '20m' });

	res.json({
	    accessToken
	});
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.cookies.jwt
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.cookie('jwt', '', {expires: new Date(0)});
    res.sendStatus(200)
});

module.exports=router




