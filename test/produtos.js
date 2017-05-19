var express = require('../config/express')();
var request = require('supertest')(express);
process.env.NODE_ENV = 'test';

describe('#ProdutosController', function(){

	beforeEach(function(done){
			var connection = express.infra.connectionFactory();
			connection.query("DELETE FROM livros", function(erros, resultados){
				if(!erros){
					done();
				}
			});
	});

	it('#1 - Listagem JSON.', function(done){
		request.get('/produtos').set('Accept', 'application/json').expect('Content-type', /json/).expect(200, done);
	});

	it('#2 - Cadastro de novo livro.', function(done){
		request.post('/produtos').send({titulo: 'titulo', descricao: 'desc', preco: '10.00'}).expect(302, done);
	});

	it('#3 - Cadastro de novo livro com dados inválidos.', function(done){
		request.post('/produtos').send({titulo: '', descricao: 'desc', preco: '10.00'}).expect(400, done);
	});
}); 