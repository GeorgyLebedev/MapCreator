const express = require('express');
const router = express.Router();
const userModel = require('./models/user');
const objectsModel=require('./models/objects');
const optionsModel=require('./models/options');
const mapModel=require('./models/map');
const stampsModel=require('./models/objects');
const nodemailer=require('nodemailer')
let model
function getModel(req){
    let model
    switch (req.params.type){
        case 'user':
            model = new userModel(req.body)
            break
        case 'map':
            model = new mapModel(req.body)
            break
        case 'objects':
            model = new objectsModel(req.body)
            break
        case 'options':
            model = new optionsModel(req.body)
            break
        case 'stamps':
            model = new stampsModel(req.body)
            break
    }
    return model
}
async function sendRegMsg(email){
    let code=""
    for (let i = 0; i < 4; i++) {
        code+=String(Math.trunc(Math.random()*10))
    }
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: 'GeorgyLebedev2001',
                pass: 'brkghrdrozhztnrz'
            },
        });
        await transporter.sendMail({
            from: "GeorgyLebedev2001@yandex.ru", // sender address
            to: email,
            subject: "Регистрация на сайте MapCreator.com", // Subject line
            text: `Ваш код для завершения регистрации: ${code} \n\rПожалуйста, не отвечайте на это письмо - оно отправлено автоматически.`,
        });
    }
    catch (e){
        return e
    }
    return code
}
router.get('/', async (req, res) => {
    res.json(await userModel.find());
});
//Добавление записи
router.post('/:type', async (req, res) => {
    if(req.params.type=="user" && !req.body.verified) {
        let query=await userModel.find({email:req.body.email})
        if(query && query.length > 0)
            res.json({msg: "Пользователь с таким E-mail уже существует!"});
            else
            res.json({code: await sendRegMsg(req.body.email)});
    }
    else if (req.params.type!="user" || (req.params.type=="user" && req.body.verified) ){
        model=getModel(req)
        await model.save();
        res.json({state: 'success'});
    }
});
//Поиск по параметру
router.get('/:type', async (req, res) => {
    let query=await userModel.find({email:req.query.email})
    res.json({result:query});
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
