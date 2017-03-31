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
	    if (dates.test(objSlug)){
			var objTime = dates.createObjFromTime(objSlug.time);//object qui contient les 4 parties de l'ajout de date(jours, heures etc..)
			reponse.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"});
			sortie = "La date est " + dates.getDate(objSlug);
	    }
		else{
            reponse.writeHead(400,{"Content-Type": "text/plain; charset=UTF-8"});
			sortie = "invalid url";
		}
		reponse.end(sortie);
	}
	else{
		displayForm(reponse);
	}
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
