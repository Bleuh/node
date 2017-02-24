//app/index.js 

var http = require('http') ;
var url = require('url') ;
var dates = require('./dates') ;

var monServeur=function(requete, reponse){
  	var page = url.parse(requete.url).pathname ;
	var sortie ;

	var slug = page.split('/');
	var date = new Date(slug);
	if(date != "Invalid Date"){
		reponse.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"}); 
		sortie = "La date est : " + dates.date1000(date);
	}
	else{
		reponse.writeHead(404);
		sortie="Erreur 404";
	}
 	reponse.end(sortie) ;
}

var serveur = http.createServer(monServeur) ;

serveur.listen(8080) ; 
