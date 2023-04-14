const express = require('express');
const router = express.Router();
const userModel = require('./models/user');
const objectsModel=require('./models/objects');
const optionsModel=require('./models/options');
const mapModel=require('./models/map');
const stampsModel=require('./models/objects');
let record
function getModel(req){
    let model
    switch (req.params.type){
        case 'user':
            model = new userModel(req.body);
            break
        case 'map':
            model = new mapModel(req.body);
            break
        case 'objects':
            model = new objectsModel(req.body);
            break
        case 'options':
            model = new optionsModel(req.body);
            break
        case 'stamps':
            model = new stampsModel(req.body);
            break
    }
    return model
}
router.get('/', async (req, res) => {
    res.json(await userModel.find());
});
//Добавление записи
router.post('/:type', async (req, res) => {
    record=getModel(req)
    await record.save();
    res.json({state: 'success'});
});

router.get('/:type/:field', async (req, res) => {
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
