// Essas linhas não precisam ser carregadas toda vez pelo 
// nodemon, portanto não precisam ficar dentro da função
var express = require('express');
var expressLoad = require('express-load');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
	
// IMPORTANTE: para você retornar qualquer coisa em js, tem de estar dentro de uma função
module.exports = function (){

	var app = express();

	app.use(express.static('./app/public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views'); //localização das páginas baseado a partir da raiz

	app.use(bodyParser.urlencoded({extended: true})); // request -> middlewareBodyParser -> middlewareAutenticação -> função que trata a request
	app.use(bodyParser.json());
	app.use(expressValidator());


// o express-load carrega o que precisarmos dentro do app, poupando vários requires pela aplicação
	expressLoad('routes',{cwd:'app'}).then('infra').into(app);

	//implantação de um middleware criado por nós mesmos!
	app.use(function(request,response, next){
		response.status(404).render('erros/404');
		next();
	})
	//implantação de um middleware criado por nós mesmos!
	app.use(function(error, request,response, next){
		if(process.env.NODE_ENV == 'production'){
			response.status(500).render('erros/500');
			return;
		}
		next(error);
	})
	return app;
}