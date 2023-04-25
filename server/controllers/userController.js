const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const nodemailer=require('nodemailer')
const bcrypt = require('bcryptjs')
const authenticateJWT=require("../authenticateJWT")
async function sendMsg(email, subject, message){
    let code=""
    for (let i = 0; i < 4; i++) {
	code+=String(Math.trunc(Math.random()*10))
    }
    try {
	let transporter = nodemailer.createTransport({
	    host: "smtp.yandex.ru",
	    port: 465,
	    secure: true,
	    auth: {
		user: 'GeorgyLebedev2001',
		pass: 'brkghrdrozhztnrz'
	    },
	});
	await transporter.sendMail({
	    from: "GeorgyLebedev2001@yandex.ru",
	    to: email,
	    subject: subject, // Subject line
	    text: `${message} ${code} \n\rПожалуйста, не отвечайте на это письмо - оно отправлено автоматически.`,
	});
    }
    catch (e){
	return e
    }
    return code
}
router.get('/', authenticateJWT, async (req, res) => {
    let query=await userModel.findById(req.user.id);
    if(query){
	res.json({
	    user: {
	        id: req.user.id,
	        login: query.email,
	    }
	});
    }
});
//Подтверждение пользователя
router.post('/confirm', async (req, res) => {
	let query=await userModel.find({email:req.body.email})
    	let message, subject, errorText
    	if(req.body.src=="register"){
    	    message='Ваш код для завершения регистрации:'
	    subject="Регистрация на сайте MapCreator.com"
	    errorText="Пользователь с таким E-mail уже существует!"
	}
    	else if(req.body.src=="pasReset"){
	    message='Ваш код для сброса пароля:'
	    subject="Сброс пароля на сайте MapCreator.com"
	    errorText="Пользователя с таким E-mail не существует!"
	}
	if((query && query.length>0 && req.body.src=="pasReset") || (!(query && query.length > 0) && req.body.src=="register"))
	    res.json({
		code: await sendMsg(req.body.email, subject, message),
	    	id:  query[0]._id});
	else
	    res.json({msg: errorText});
});
//Добавление записи
router.post('/', async (req, res) => {
    if(req.body.verified) {
	req.body.password= bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
	let activeRecord=new userModel(req.body)
	await activeRecord.save();
	res.json({state: 'success'});
    }
});
//Обновление пароля
router.put('/:id', async (req, res) => {
    req.body.password=bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
    await userModel.findByIdAndUpdate(req.params.id, {password: req.body.password});
    res.json({state: 'updated'});
});

router.delete('/:id', async (req, res) => {
    await userModel.findByIdAndRemove(req.params.id);
    res.json({state: 'deleted'});
});
module.exports = router;
