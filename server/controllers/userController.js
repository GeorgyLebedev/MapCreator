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
	    subject: subject,
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
	        email: query.email,
		login:query.login,
		avatar: query.avatar,
		registrationDate: query.registrationDate
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
	if((query.length>0 && req.body.src=="pasReset") || (!(query.length > 0) && req.body.src=="register"))
	    res.json({
		code: await sendMsg(req.body.email, subject, message),
	    	id:  query.length>0?query[0]._id:null});
	else
	    res.status(500).send({message: errorText})
});
//Добавление записи
router.post('/', async (req, res) => {
        try {
	    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
	    let activeRecord = new userModel(req.body)
	    await activeRecord.save();
	    res.sendStatus(201)
	}
	catch (e) {
	    res.status(500).send({message:'Ошибка регистрации пользователя!'})
	}
});
//Обновление пароля
router.put('/:id', async (req, res) => {
    try {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
	await userModel.findByIdAndUpdate(req.params.id, {password: req.body.password});
	res.sendStatus(200)
    }
    catch (e) {
	res.status(500).send({message:'Ошибка обновления пароля!'})
    }
});
router.put('/', authenticateJWT, async (req, res) => {
    try {
	await userModel.updateOne({_id: req.user.id}, req.body);
	res.sendStatus(200)
    }
    catch (e) {
	res.status(500).send({message:'Ошибка обновления данных пользователя!'})
    }
});
router.delete('/:id', async (req, res) => {
    try {
	await userModel.findByIdAndRemove(req.params.id);
	res.sendStatus(200)
    }
    catch (e){
	res.status(500).send({message:'Ошибка удаления данных пользователя!'})
    }
});
module.exports = router;
