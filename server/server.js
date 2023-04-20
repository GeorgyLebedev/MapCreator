const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors')
const cookieParser = require("cookie-parser");
const aut=require('./authenticateJWT')
const app = express();
app.set('port', 1111)
app.use(cors({
    origin: 'http://localhost:8080', // it depends on your site
    credentials: true,
}));
app.use(cookieParser())
mongoose.connect('mongodb://127.0.0.1:27017/mapcreator' )
    .then(()=> console.log('[OK] DB is connected'))
    .catch(err => console.error(err));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/user', require("./controllers/userController"))
app.use('/auth', require("./controllers/authController"))
app.use('/', express.static(path.join(__dirname, '../dist')))
app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});
