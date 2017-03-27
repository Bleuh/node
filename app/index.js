//app/index.js 

var http = require('http') ;
var fs = require('fs');
var url = require('url') ;
var dates = require('./dates') ;

var monServeur=function(requete, reponse){

 	var date = requete.url;
	var slug = date.split('/');

	var sortie ;

	if(slug[1] != 'favicon.ico' && slug[1] != ''){

		var objSlug = dates.createObjFromSlug(slug[1]);//Object qui contient les partie de la requete
		var objTime = dates.createObjFromTime(objSlug.time);//object qui contient les 4 parties de l'ajout de date(jours, heures etc..)
		bool = true;
		// faire les tests et erreur possible
		// Pourquoi pas ajouter une fonction dans dates.js ? Hein Emma ;) Genre tu fais :
		// var bool = dates.test(objSlug, objTime)
		if (true) {//si c'est bon on va ici sinon on affiche une erreur
			reponse.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"}); 
			sortie = "La date est " + dates.getDate(objslug);

		}
		else{
			sortie = "invalid url";
		}
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
