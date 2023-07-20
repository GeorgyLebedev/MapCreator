const axios=require("axios") //подключение Axios
const jwt = require('jsonwebtoken'); //подключение библиотеки JWT
const accessTokenSecret = "627795a28a0522cf4398b4015f7bffb7774441288bfe5c953953bcd7ac2f5e7a" //секретный ключ токена доступа
const authenticateJWT = (req, res, next) => { //функция принимает на вход запрос, ответ,
    const authHeader = req.headers.authorization; //извлечение заголовка авторизации
    if (authHeader) { //если он есть
	const token = authHeader.split(' ')[1]; //получаем токен из заголовка
	if (token == null) return res.sendStatus(401)  //если токена нет: отправляем код 401 - отказ в доступе
	jwt.verify(token, accessTokenSecret, async (err, decoded) => { //функция проверки токена
	    if (!err) {
		req.user={}
		req.user.id = decoded.id;
		next();
	    }
	    else if(err.name=="TokenExpiredError"){ //если токен истёк
	        try {
	            const refToken=req.cookies.jwt //получаем токен обновления из куки
		    let request = (await axios({ //отправляем запрос на обновление токена доступа
			url: "http://localhost:1111/auth/token",
			method: 'post',
			data: {
			    token: refToken
			}
		    })).data
		    return res.json({newToken: request.token}) //возвращаем новый токен
		}
		catch (e){
	            //в случае, если произошли непредвиденные ошибки, отправляем сообщение
	            return res.status(401).send({message:"Ошибка авторизации. Вы будете перенаправлены на страницу авторизации для повторного входа."})
		}
	    }
	    else return res.status(500).send({message:err});
	});
    } else {
	return res.status(401).send({message:"Ошибка авторизации. Вы будете перенаправлены на страницу авторизации для повторного входа."}) // отправляем код 401 - отказ в доступе
    }
}
module.exports=authenticateJWT
