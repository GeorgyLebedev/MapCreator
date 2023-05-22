const express = require('express'); //подключение необходимых библиотек и модулей
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors')
const cookieParser = require("cookie-parser");
const app = express(); //создание приложения
app.set('port', 1111) //установка порта 1111
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
})); //установка политики CORS
app.use(cookieParser()) //подключение cookieParser для установки и чтения куки на сервере
mongoose.connect('mongodb://127.0.0.1:27017/mapcreator' ) //подключение к базе данных
    .then(()=> console.log('[OK] DB is connected'))
    .catch(err => console.error(err));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/user', require("./controllers/userController")) //подключение контроллеров
app.use('/auth', require("./controllers/authController"))
app.use('/map', require("./controllers/mapController"))
app.use('/options', require("./controllers/optionsController"))
app.use('/', express.static(path.join(__dirname, '../dist')))
app.listen(app.get('port'), () => { // вывод информации о запуске сервера
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});
