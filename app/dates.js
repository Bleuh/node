exports.getDate = function(obj){
  	return this.createNewDate(obj.date, obj.operator, obj.time);
}; 

exports.createNewDate = function(date, operator, time){
	var time = this.createObjFromTime(time);
	var dateResult = new Date(date);
	dateResult = this.changeDay(dateResult, operator, time.days);
	dateResult = this.changeHours(dateResult, operator, time.hours);
	dateResult = this.changeMin(dateResult, operator, time.min);
	dateResult = this.changeSec(dateResult, operator, time.sec);
  	return dateResult.toISOString();
};

exports.changeDay = function(date, operator, days){
	if (operator == "+") {
  		date.setDate(date.getDate() + parseInt(days));
	}
	else {
  		date.setDate(date.getDate() - parseInt(days));
	}
  	return date;
};

exports.changeHours = function(date, operator, hours){
	var dateResult = date;
	var currentHours = date.getHours();
	if (operator == "+") {
		var newHours = currentHours + parseInt(hours);
    	dateResult.setHours(newHours);
	}
	else {
		var newHours = currentHours - parseInt(hours);
    	dateResult.setHours(newHours);
    	if (newHours > currentHours) {
    		dateResult = this.changeDay(dateResult, operator, '1');
    	}
	}
  	return dateResult;
}; 

exports.changeMin= function(date, operator, min){
	var dateResult = date;
	var currentMinutes = date.getMinutes();
	if (operator == "+") {
		var newMinutes = currentMinutes + parseInt(min);
    	dateResult.setMinutes(newMinutes);
	}
	else {
		var newMinutes = currentMinutes - parseInt(min);
    	dateResult.setMinutes(newMinutes);
	}
  	return dateResult;
}; 

exports.changeSec= function(date, operator, sec){
	var dateResult = date;
	var currentSec = date.getSeconds();
	if (operator == "+") {
		var newSec = currentSec + parseInt(sec);
    	dateResult.setSeconds(newSec);
	}
	else {
		var newSec = currentSec - parseInt(sec);
    	dateResult.setSeconds(newSec);
	}
  	return dateResult;
}; 

exports.createObjFromSlug = function(slug){
	var splited = slug.split("+");
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

exports.createObjFromTime = function(time){
	var days = time.split("d");
	var hours = days[1].split("h");
	var min = hours[1].split("m");
	var sec = min[1].split("s");
	var obj = {
	    days:days[0],
	    hours:hours[0],
	    min:min[0],
	    sec:sec[0]
	};
  	return obj;
};