function llenartablita(users)
{
    var tbody = "";
       for(var i=0; i<users.length; i++)
       {
           tbody += '<tr>'+//table row
                        '<td>'+users[i].id+'</td>'+//aqui agrega los datos en la tabla
                        '<td>'+users[i].name+'</td>'+
                        '<td>'+users[i].signupCohort+'</td>'+
                        '<td>'+users[i].timezone+'</td>'+
                        '<td>'+users[i].locale+'</td>'+
                        '<td>'+users[i].role+'</td>'+
                        
                    '</tr>';
       }
       document.getElementById("tbody").innerHTML = tbody;
}