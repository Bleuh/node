exports.dateLisible = function(date){
	var monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
                'août', 'septembre', 'octobre', 'novembre', 'décembre'];
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var dateReturn = day + " " + monthNames[month] + " " + year;
  	return dateReturn ;
};

exports.date1000 = function(date){
	date.setDate(date.getDate() + 1000);
  	return this.dateLisible(date) ;
}; 
