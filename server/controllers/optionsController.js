const express = require('express');
const router = express.Router();
const optionsModel = require('../models/options');
const authenticateJWT = require("../authenticateJWT")

router.get('/', authenticateJWT, async (req, res) => {
    try {
	res.json({options: await optionsModel.findOne({user: req.user.id})})
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
router.put('/', authenticateJWT, async (req, res) => {
	try {
	    await optionsModel.updateOne({user:req.user.id}, req.body)
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
