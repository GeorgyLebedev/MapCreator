const express = require('express');
const router = express.Router();
const userModel = require('./models/user');
const objectsModel=require('./models/objects');
const optionsModel=require('./models/options');
const mapModel=require('./models/map');
const stampsModel=require('./models/objects');
let record
router.get('/', async (req, res) => {
    res.json(await userModel.find());
});

router.post('/:type', async (req, res) => {
    switch (req.params.type){
        case 'user':
            record = new userModel(req.body);
            break
        case 'map':
            record = new mapModel(req.body);
            break
        case 'objects':
            record = new objectsModel(req.body);
            break
        case 'options':
            record = new optionsModel(req.body);
            break
        case 'stamps':
            record = new stampsModel(req.body);
            break
    }
    await record.save();
    res.json({state: 'success'});
});

router.get('/:id', async (req, res) => {
    res.json(await userModel.findById(req.params.id));
});

router.put('/:id', async (req, res) => {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({state: 'updated'});
});

router.delete('/:id', async (req, res) => {
    await userModel.findByIdAndRemove(req.params.id);
    res.json({state: 'deleted'});
});
module.exports = router;
