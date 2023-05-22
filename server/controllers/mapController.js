const express = require('express');
const router = express.Router(); //создание роутера для обработки запросов внутри контроллера
const mapModel = require('../models/map'); //подключение объектной модели для работы с картами
const authenticateJWT = require("../authenticateJWT") //подключение функции JWT-аутентификации
router.get('/', authenticateJWT, async (req, res) => {
    try {
	res.json({maps: await mapModel.find({user: req.user.id})})
    } catch (e) {
	res.json({msg: e.message})
    }
});
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
	res.json({map: await mapModel.findById(req.params.id)})
    } catch (e) {
	res.json({msg: e.message})
    }
});
router.post('/', authenticateJWT, async (req, res) => {
    try {
	let activeRecord = new mapModel(req.body)
	activeRecord.user = req.user.id
	await activeRecord.save();
	res.json({state: 'success'});
    } catch (e) {
	res.json({msg: e.message})
    }

});
router.put('/:id', authenticateJWT, async (req, res) => {
	try {
	    await mapModel.findByIdAndUpdate(req.params.id, {title: req.body.title})
	    await mapModel.findByIdAndUpdate(req.params.id, {changeDate: new Date()})
	    if (req.body.description)
		await mapModel.findByIdAndUpdate(req.params.id, {description: req.body.description})
	    res.json({state: 'updated'});
	} catch (e) {
	    res.json({msg: e.message})
	}
    }
)
router.delete("/:id", authenticateJWT, async (req, res) => {
	try {
	    await mapModel.findByIdAndRemove(req.params.id)
	    res.json({state: 'deleted'});
	} catch (e) {
	    res.json({msg: e.message})
	}
    }
)
module.exports = router
