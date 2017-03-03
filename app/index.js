//app/index.js 

var http = require('http') ;
var fs = require('fs');
var url = require('url') ;
var dates = require('./dates') ;

var monServeur=function(requete, reponse){

  	var parsedUrl = url.parse(requete.url, true);
	var sortie ;
  	var param = parsedUrl.query;

	if(param.time != null){
		reponse.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"}); 
		sortie = "La date est " + dates.ajouteDate(param.time);
		reponse.end(sortie);
	}
	else{
		displayForm(reponse);
	}
	// exo du cours
 	// var page = url.parse(requete.url).pathname ;
	// var sortie ;

	// var slug = page.split('/');
	// var date = new Date(slug);
	// if(date != "Invalid Date"){
	// 	reponse.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"}); 
	// 	sortie = "La date est : " + dates.date1000(date);
	// }
	// else{
	// 	reponse.writeHead(404);
	// 	sortie="Erreur 404";
	// }
}

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

var serveur = http.createServer(monServeur) ;

serveur.listen(8080) ; 
console.log("Server listening on port 8080");
