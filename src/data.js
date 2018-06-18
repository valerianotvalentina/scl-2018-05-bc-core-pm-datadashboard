function data() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       // Typical action to be performed when the document is ready:
       var users = JSON.parse(xhttp.responseText);
       var nombres = "";
       for(var i=0; i<users.length; i++)
       {
           nombres += users[i].name + ' ' + users[i].id+ '</br>';
       }
       document.getElementById("hola").innerHTML = nombres;
    }
};
xhttp.open("GET","http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/users.json", true);
xhttp.send();

};



