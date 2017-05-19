var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port: 3000,
	path: '/produtos',
	method: 'post',
	headers: {
		'Accept': 'application/json',// para receber
		'Content-type': 'application/json'// para enviar
	}
};

var client = http.request(configuracoes,function(response){
	console.log(response.statusCode);
	response.on('data', function(body){
		console.log('Corpo ' + body);
	});
});

var produto = {
	titulo: '',
	descricao: 'Aprenda tudo sobre Ruby',
	preco: '19.90'
}

client.end(JSON.stringify(produto));
