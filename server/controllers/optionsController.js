const express = require('express');
const router = express.Router();
const optionsModel = require('../models/options');
const authenticateJWT = require("../authenticateJWT")

router.get('/', authenticateJWT, async (req, res) => {
    try {
	res.json({options: await optionsModel.findOne({user: req.user.id})})
    }
    catch (e) {
	res.status(500).send({message:'Ошибка получения настроек пользователя!'})
    }
});
router.post('/', authenticateJWT, async (req, res) => {
    try {
	let activeRecord = new optionsModel(req.body)
	activeRecord.user = req.user.id
	await activeRecord.save();
	res.sendStatus(201)
    }
    catch (e) {
	res.status(500).send({message:'Ошибка создания настроек пользователя!'})
    }

});
router.put('/', authenticateJWT, async (req, res) => {
	try {
	    await optionsModel.updateOne({user:req.user.id}, req.body)
	    res.sendStatus(200)
	}
	catch (e) {
	    res.status(500).send({message:'Ошибка обновления настроек пользователя!'})
	}
    }
)
router.delete("/:id", authenticateJWT, async (req, res) => {
	try {
	    await optionsModel.findByIdAndRemove(req.params.id)
	    res.sendStatus(200)
	}
	catch (e) {
	    res.status(500).send({message:'Ошибка удаления настроек пользователя!'})
	}
    }
)
module.exports=router
