function data() {
var xhttp = new XMLHttpRequest();
xhttp.open("GET","http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/users.json", false);
xhttp.send();
var jsonobj = JSON.parse(xhttp.responseText);
console.log(jsonobj);
return jsonobj;


};




