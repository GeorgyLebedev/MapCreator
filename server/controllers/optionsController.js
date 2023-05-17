const express = require('express');
const router = express.Router();
const optionsModel = require('../models/options');
const authenticateJWT = require("../authenticateJWT")

router.get('/:id', authenticateJWT, async (req, res) => {
    try {
	res.json({options: await optionsModel.findById(req.params.id)})
    } catch (e) {
	res.json({msg: e.message})
    }
});
router.post('/', authenticateJWT, async (req, res) => {
    try {
	let activeRecord = new optionsModel(req.body)
	activeRecord.user = req.user.id
	await activeRecord.save();
	res.json({state: 'success'});
    } catch (e) {
	res.json({msg: e.message})
    }

});
router.put('/:id', authenticateJWT, async (req, res) => {
	try {
	    await optionsModel.findByIdAndUpdate(req.params.id, {title: req.body.title})
	    await optionsModel.findByIdAndUpdate(req.params.id, {changeDate: new Date()})
	    if (req.body.description)
		await optionsModel.findByIdAndUpdate(req.params.id, {description: req.body.description})
	    res.json({state: 'updated'});
	} catch (e) {
	    res.json({msg: e.message})
	}
    }
)
router.delete("/:id", authenticateJWT, async (req, res) => {
	try {
	    await optionsModel.findByIdAndRemove(req.params.id)
	    res.json({state: 'deleted'});
	} catch (e) {
	    res.json({msg: e.message})
	}
    }
)
module.exports=router
