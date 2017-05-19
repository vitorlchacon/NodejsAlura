module.exports = function(app){
	app.get("/promocoes/form", function(request, response){
		var connection = app.infra.connectionFactory(); //"app.infra." pois o loader nos proporciona isso.
		var produtosDAO = new app.infra.ProdutosDAO(connection); 
	
		produtosDAO.lista(function(erros, resultados){
			response.render('promocoes/form',{lista:resultados}); 
		});
		connection.end();
	});

	app.post('/promocoes', function(request, response){
		var promocao = request.body;
		console.log(promocao);
		app.get('io').emit('novaPromocao', promocao);
		response.redirect('promocoes/form');
	});
}