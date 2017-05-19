// var express = require('express');
// var app = express();
// app.set('view engine', 'ejs'); 
// A linha de cima seta a engine ejs para o uso de páginas
// dinâmicas, que ficarão dentro do diretório 'views'
//
// A fim de refatorar o código, essa parte inteira de cima pode virar 
// a seguinte linha com um arquivo de configuração do express:
var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

// app.get('/produtos', function(request, response){
// 		response.render("produtos/lista"); // 'lista' é o arquivo .ejs dentro do diretório 'produtos'
// });
// A fim de refatorar o código, essa parte inteira de cima pode virar 
// a seguinte linha com um arquivo de configuração de rotas:
// var rotasProdutos = require('./app/routes/produtos')(app);
// porém, com o express-load, essa configuração de rotas 
// não é mais necessária, sendo substituida pelo load do express.js

http.listen(3000, function(){
	console.log("Server is runnung.")
});