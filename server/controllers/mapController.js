const express = require('express');
const router = express.Router();
const mapModel = require('../models/map');
const authenticateJWT=require("../authenticateJWT")
router.get('/', authenticateJWT, async (req, res) => {
       res.json({maps:await mapModel.find({user: req.user.id})})
});
router.post('/', authenticateJWT,async (req, res) => {
       try{
              let activeRecord=new mapModel(req.body)
              activeRecord.user=req.user.id
              await activeRecord.save();
              res.json({state: 'success'});
       }
       catch (e) {
              res.json({msg:e.message})
       }

});
router.put('/:id',authenticateJWT, async (req, res)=>{
       try {
              await mapModel.findByIdAndUpdate(req.params.id, {title: req.body.title})
              await mapModel.findByIdAndUpdate(req.params.id, {changeDate: new Date()})
              if(req.body.description)
                     await mapModel.findByIdAndUpdate(req.params.id, {description: req.body.description})
              res.json({state: 'updated'});
       }
       catch (e) {
              res.json({msg:e.message})
       }
    }
)
router.delete("/:id", authenticateJWT, async (req, res)=>{
       try {
              await mapModel.findByIdAndRemove(req.params.id)
              res.json({state: 'deleted'});
       }
       catch (e) {
              res.json({msg:e.message})
       }
}
)
module.exports = router
