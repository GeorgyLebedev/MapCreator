const express = require('express');
const router = express.Router(); //создание роутера для обработки запросов внутри контроллера
const mapModel = require('../models/map'); //подключение объектной модели для работы с картами
const authenticateJWT = require("../authenticateJWT") //подключение функции JWT-аутентификации
router.get('/', authenticateJWT, async (req, res) => {
    try {
	res.json({maps: await mapModel.find({user: req.user.id})})
    } catch (e) {
	res.status(500).send({message:'Ошибка получения карт!'})
    }
});
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
	res.json({map: await mapModel.findById(req.params.id)})
    } catch (e) {
	res.status(500).send({message:'Ошибка получения данных карты!'})
    }
});
router.post('/', authenticateJWT, async (req, res) => {
    try {
	let activeRecord = new mapModel(req.body)
	activeRecord.user = req.user.id
	await activeRecord.save();
	res.sendStatus(201)
    } catch (e) {
	res.status(500).send({message:'Ошибка создания карты!'})
    }
});
router.put('/:id', authenticateJWT, async (req, res) => {
	try {
	    await mapModel.updateOne({_id:req.params.id}, req.body)
	    await mapModel.findByIdAndUpdate(req.params.id, {changeDate: new Date()})
	    res.sendStatus(200)
	} catch (e) {
	    res.status(500).send({message:'Ошибка обновления карты!'})
	}
    }
)
router.delete("/:id", authenticateJWT, async (req, res) => {
	try {
	    await mapModel.findByIdAndRemove(req.params.id)
	    res.sendStatus(200)
	} catch (e) {
	    res.status(500).send({message:'Ошибка удаления карты!'})
	}
    }
)
module.exports = router
