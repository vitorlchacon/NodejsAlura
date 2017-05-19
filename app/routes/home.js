module.exports = function(app){
	app.get('/', function(request, response){
		var connection = app.infra.connectionFactory(); //"app.infra." pois o loader nos proporciona isso.
		var produtosDAO = new app.infra.ProdutosDAO(connection); 
	
		produtosDAO.lista(function(erros, resultados){
			response.render('home/index',{livros:resultados}); 
		});
		connection.end();
	});
}