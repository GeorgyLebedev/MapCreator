const express = require('express');
const router = express.Router();
const mapModel = require('../models/map');
const authenticateJWT=require("../authenticateJWT")
router.get('/', authenticateJWT, async (req, res) => {
       res.json({maps:await mapModel.find({author: req.user.id})})
});
router.post('/', authenticateJWT,async (req, res) => {
       try{
              let activeRecord=new mapModel(req.body)
              await activeRecord.save();
              res.json({state: 'success'});
       }
       catch (e) {
              res.json({msg:e})
       }

});
module.exports = router
