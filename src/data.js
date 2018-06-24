function cargar(cohort) { // "cohort" esta en fetch para devolver a la tabla en html
    Promise.all([
        fetch("../data/cohorts/" + cohort + "/users.json"),
        fetch("../data/cohorts/" + cohort + "/progress.json"),
        fetch("../data/cohorts.json")
    ]).then( // al cumplirse las promesas se hace lo siguente
        (DatosJsons) => {
            return Promise.all(DatosJsons.map((Respuesta) => { // crea un nuevo array con objetos json
                return Respuesta.json();
            }));
        }
    ).then(
        (RespuestaJson) => {
            console.log(RespuestaJson)
            var usuarios = computeUsersStats(RespuestaJson[0], RespuestaJson[1], RespuestaJson[2]);
            // var items = [RespuestaJson[0], RespuestaJson[1], RespuestaJson[2]];
            usuarios.sort((a, b) => a.name.localeCompare(b.name));

            var tbody = "";
            for (let i = 0; i < usuarios.length; i++) {
                tbody += '<tr>' + // aqui esta la funcionalidad de la tabla
                    '<td>' + usuarios[i].name + '</td>' + // NombreorderDirectionorderDirection
                    '<td>' + usuarios[i].stats.reads.percent + '</td>' + // Porcentaje de lecturas
                    '<td>' + usuarios[i].stats.exercises.percent + '</td>' + // Porcentaje de ejercicios
                    '<td>' + usuarios[i].stats.quizzes.percent + '</td>' + // Porcentaje de Cuestionarios
                    '<td>' + usuarios[i].stats.quizzes.scoreAvg + '</td>' + // Puntaje de Cuestionarios
                    '<td>' + usuarios[i].stats.percent + '</td>' + // Porcentaje Total
                    '</tr>';
            }
            document.getElementById('tbody').innerHTML = tbody;

        }
    ).catch((err) => {
        console.log(err);
    })
}

function computeUsersStats(users, progress, cohorts) { // funcion que se encarga de devolver el obj usuario
    var usuarios = [];
    usuarios = users.map(function(x) { // x corresponde a cada dato dentro del array.orderDirectionorderDirection
        x.stats = { exercises: {}, reads: {}, quizzes: {}, percent: 0 };
        // Llenar quizzes
        // Se obtiene los numeros
        // console.log(x.id);

        if (progress[x.id].intro) { // con esta funcion comprobamos si existe el dato intro en nuestro objeto
            // agrega valor percent del
            x.stats.percent = progress[x.id].intro.percent;
            let quizz = progress[x.id].intro.units; // se crea la var con contenido del obj unit
            let quizzes = { total: 0, completed: 0, percent: 0, scoreSum: 0, scoreAvg: 0, scoreUni: 0 };
            let reads = { total: 0, completed: 0, percent: 0 };
            let exercises = { total: 0, completed: 0, percent: 0 };
            // Se llena los datos
            for (var uni in quizz) { // recorrera todos los datos de unit
                for (var par in quizz[uni].parts) { // recorrera todos los datos de parts
                    let elemento = quizz[uni].parts[par]; // crea var con contenido del parts explorado
                    if (elemento.type == "quiz") {
                        quizzes.total++; // cuento la cantidad de quizzes
                        if (elemento.score) { // si existe elemnto score
                            quizzes.scoreUni++; // si existe el score lo cuenta
                            quizzes.scoreSum = quizzes.scoreSum + elemento.score; // suma el score total que tenga
                        }
                        if (elemento.completed == 1) // cuenta los quizzes completados
                            quizzes.completed++;
                    }
                    if (elemento.type == "read") {
                        reads.total++;
                        if (elemento.completed == 1)
                            reads.completed++;

                    }
                    if (elemento.type == "practice") {
                        exercises.total++;
                        if (elemento.completed == 1)
                            exercises.completed++;
                    }
                }
            } // fin llenado de valores
            // poner a los valores del objeto
            // asignacion de valores al objeto
            // reads
            x.stats.reads.total = reads.total;
            x.stats.reads.completed = reads.completed;
            x.stats.reads.percent = parseInt((reads.completed / reads.total) * 100);
            // exercises
            x.stats.exercises.total = exercises.total;
            x.stats.exercises.completed = exercises.completed;
            x.stats.exercises.percent = parseInt((exercises.completed / exercises.total) * 100);
            // quizzes
            x.stats.quizzes.total = quizzes.total;
            x.stats.quizzes.completed = quizzes.completed;
            x.stats.quizzes.percent = parseInt((quizzes.completed / quizzes.total) * 100);
            x.stats.quizzes.scoreSum = quizzes.scoreSum;
            if (quizzes.scoreSum == 0) {
                x.stats.quizzes.scoreAvg = 0;
            } else {
                x.stats.quizzes.scoreAvg = parseInt(quizzes.scoreSum / quizzes.scoreUni); // saca promedio
            }


        } else {
            x.stats.exercises.total = 0;
            x.stats.exercises.completed = 0;
            x.stats.exercises.percent = 0;
            x.stats.reads.total = 0;
            x.stats.reads.completed = 0;
            x.stats.reads.percent = 0;
            x.stats.quizzes.total = 0;
            x.stats.quizzes.completed = 0;
            x.stats.quizzes.scoreSum = 0;
            x.stats.quizzes.scoreAvg = 0;
            x.stats.percent = 0;
        }
        return x; // x al terminar de recorrer la data entrega valor usuarios
    });

    return usuarios;
}

function prueba() {
    console.log("prueba");

}
/* function sortUsers(usuarios, orderBy, orderDirection) {
    if (orderBy === "name") {
        //return usuarios.sort()
        console.log(orderBy.sort) */
/*
        if (orderDirection === "ASC") {
           ordenados = usuarios.sort((a, b) => a.name.localeCompare(b.name));
        }
 
    }
    }
}
/* ordenarPorNombre = (orderDirection)=>{
    return function (users, users){
        let compararResultados = users.name.localeCompare(users.name);
        return orderDirection === "ASC" ? compararResultados : -compararResultados;
    }
}
*/