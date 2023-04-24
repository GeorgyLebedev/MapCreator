const express = require('express');
const router = express.Router();
const mapModel = require('../models/map');

router.get('/', async (req, res) => {
       res.json(await mapModel.find({userId: req.user._id}));
});

module.exports = router;
