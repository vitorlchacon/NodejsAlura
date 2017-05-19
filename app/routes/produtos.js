// importando o módulo de conexão com o banco
// var connectionFactory = require('../infra/connectionFactory');
// porém, não se faz mais necessário, pois o express-load já fez isso



// Usando o commonsJS para modularizar o código.
module.exports = function(app){
	var listaProdutos = function(request, response, next){
		//connectando com o banco
		var connection = app.infra.connectionFactory(); //"app.infra." pois o loader nos proporciona isso.
		//passo pra dentro a conexão
		var produtosDAO = new app.infra.ProdutosDAO(connection); 
	
		// A criação de uma query, que diferentemente do método tradicional, onde se atribui o resultado de uma query numa variável,
		// você passa uma função junto da query com o retorno, e tem de ter no mínimo um parâmetro, o 'err', prática comum em 
		// javascript se ter o parâmetro err para qualquer função de callback.
		produtosDAO.lista(function(erros, resultados){
			if(erros){
				return next(erros);
			}
			response.format({
				html: function(){
					response.render('produtos/lista',{lista:resultados}); 
				},
				json: function(){
					response.json(resultados);
				}
			});
			//toda conexão aberta, obviamente, tem de ser fechada.
			connection.end();
			//response.send("<html><body><h1>Listando produtos</h1></body></html>");
			// Esse seria o modo de enviar a resposta de requisição, porém enviar
			// uma string não é viável, portanto usa-se o EJS para parametrizar isso.
			//response.render('produtos/lista'); // 'lista' é o arquivo .ejs dentro do diretório 'produtos' dentro de 'views' na raiz, devido ao express.
		});
	};

	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', function(request,response){
		response.render('produtos/form', {errosValidacao: {}, produto: {}});
	});

	app.get('/produtos/remove', function(){
		var produto = produtosDAO.carrega(id, callback);
		if(produto){
			produtosDAO.remove(produto, callback);
		}
	});
	
	app.post('/produtos', function(request,response){
		
		var produto = request.body;

		request.assert('titulo', 'O título do livro é obrigatório.').notEmpty();
		request.assert('preco', 'Insira um valor válido.').isFloat();

		var erros = request.validationErrors();
		if (erros) {
			response.format({
				html: function(){
					response.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});
				},
				json: function(){
					response.status(400).json(erros);
				}
			});
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection); 
		produtosDAO.salva(produto, function(erros, resultados){
			//Always redirect afer POST
			response.redirect('/produtos');
		});
		connection.end();
	});
}