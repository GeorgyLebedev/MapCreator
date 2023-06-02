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
	const accessToken = jwt.sign({ id: query[0]._id }, accessTokenSecret , { expiresIn: '10m' });
	const refreshToken = jwt.sign({ id:  query[0]._id }, refreshTokenSecret, { expiresIn: '30d' });
	refreshTokens.push(refreshToken);
	res.cookie('jwt', refreshToken, { httpOnly: true,
	    sameSite: false, secure: false,
	    maxAge: 30 * 24 * 60 * 60 * 1000 });
	res.json({token: accessToken, username: query[0].login});
    }
    else {
	res.json({msg:'Неправильный логин или пароль!'});
    }
});

router.post('/token', (req, res) => {
    const refToken = req.body.token;
    if (!refToken) {
	return res.sendStatus(401);
    }
/*
    if (!refreshTokens.includes(refToken)) {
	return res.sendStatus(403);
    }*/
    jwt.verify(refToken, refreshTokenSecret, async (err, decoded) => {
	if (err) {
	    return res.sendStatus(403);
	}
	const accessToken = jwt.sign({ id: decoded.id }, accessTokenSecret, { expiresIn: '10m' });

	res.json({
	    token: accessToken,
	});
    })
});

router.post('/logout', (req, res) => {
    const { token } = req.cookies.jwt
    if(token) {
	refreshTokens = refreshTokens.filter(t => t !== token);
	res.cookie('jwt', '', {expires: new Date(0)});
    }
    res.sendStatus(200)
});

module.exports=router




