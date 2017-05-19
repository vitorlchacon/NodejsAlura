// O connection fica aqui em um wrapper para passar a conexão somente uma vez, ao invés
// de passar em cada uma das funções de dentro. E para ser entendido pelo Express-Load
function ProdutosDAO(connection){
	// Uma convenção do javascript é o uso do underline para definir atributos proivados 
	this._connection = connection;
}

// O prototype é muito utilizado no javascript para definir a estrutura padrão de classes.
ProdutosDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM livros', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
	this._connection.query('INSERT INTO livros SET ?', produto, callback);
}

// Constituem a classe: funções e variáveis de estado.
module.exports = function(){
	return ProdutosDAO;
}