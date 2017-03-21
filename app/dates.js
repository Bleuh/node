// exports.dateLisible = function(date){
// 	var monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
//                 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
// 	var year = date.getFullYear();
// 	var month = date.getMonth();
// 	var day = date.getDate();
// 	var dateReturn = day + " " + monthNames[month] + " " + year;
//   	return dateReturn ;
// };

exports.ajouteDate = function(slug){
	var date = this.getDate(slug);
  	return date ;
}; 

exports.getDate = function(slug){
	var obj = this.createObjFromSlug(slug);
  	return this.createNewDate(obj.date, obj.operator, obj.time);
}; 

exports.createNewDate = function(date, operator, time){
	var date = Date();
  	return date;
}; 

exports.createObjFromSlug = function(slug){
	var splited = slug.split("+")
	var operator = '+';
	if (splited.length == 1) {
		splited = slug.split("-");
		var date = splited.splice(0, splited.length - 1).join('-');
		var time = splited.splice(-1).join();
		var operator = '-';
	}
	else{
		var date = splited[0];
		var time = splited[1];
	}
	var obj = {
	    date:date,
	    operator:operator,
	    time:time
	};
  	return obj;
}; 


// exports.date1000 = function(date){
// 	date.setDate(date.getDate() + 1000);
//   	return this.dateLisible(date) ;
// }; 
