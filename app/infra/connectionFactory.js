//importando a biblioteca do mysql
var mysql = require('mysql');
//FACTORY METHOD (isola a função para a criação de um objeto complexo)
function createDBConnection(){
	//configurando e retornando a conexão através da sintaxe do JSON
	if(!process.env.NODE_ENV){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'casadocodigo_nodejs22'
		});
	}
	if(process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'casadocodigo_nodejs_test'
		});
	}
}

// Wrapper, pois só se passa a informação da função acima, sem carregá-la com o intuito de
// não conectar no banco desnecessariamente. Somente quando carregarmos o objeto
module.exports = function(){
	return createDBConnection;
}