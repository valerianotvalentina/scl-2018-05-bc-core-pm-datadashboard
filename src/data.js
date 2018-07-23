function cargar(cohort) { // "cohort" esta en fetch para devolver a la tabla en html
    Promise.all([
        fetch("../data/cohorts/" + cohort + "/users.json"),
        fetch("../data/cohorts/" + cohort + "/progress.json"),
        fetch("../data/cohorts.json")
    ]).then( // al cumplirse las promesas se hace lo siguente
        (DatosJsons) => {
            return Promise.all(DatosJsons.map((Respuesta) => { // crea un nuevo array con objetos json
                return Respuesta.json();
            }))
        }
    ).then(
        (RespuestaJson) => {
            console.log(RespuestaJson)
            var usuarios = computeUsersStats(RespuestaJson[0], RespuestaJson[1], RespuestaJson[2]);
            var orden = document.getElementById('Order').value;
            var ordenpor = document.getElementById('orderby').value;
            usuarios = sortUsers(usuarios, orden, ordenpor);

            if (document.getElementById('buscador').value != "") {
                usuarios = filterUsers(usuarios, document.getElementById('buscador').value);
            }
            llenartabla(usuarios);



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
            // asigacion de valores al objeto
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
            if (quizzes.total == 0 || quizzes.completed == 0) {
                x.stats.quizzes.percent = 0;
            } else {
                x.stats.quizzes.percent = parseInt((quizzes.completed / quizzes.total) * 100);
            }

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

function sortUsers(users, orderby, orderDirection) {
    if (orderDirection == "ASC") {
        if (orderby == "Nombre")
            users.sort((a, b) => a.name.localeCompare(b.name));
        if (orderby == "Total")
            users.sort((a, b) => a.stats.percent - b.stats.percent);
        if (orderby == "Lecturas")
            users.sort((a, b) => a.stats.reads.percent - b.stats.reads.percent);
        if (orderby == "Ejercicios")
            users.sort((a, b) => a.stats.exercises.percent - b.stats.exercises.percent);
        if (orderby == "Cuestionarios")
            users.sort((a, b) => a.stats.quizzes.percent - b.stats.quizzes.percent);
        if (orderby == "Suma cuestionarios")
            users.sort((a, b) => a.stats.quizzes.scoreSum - b.stats.quizzes.scoreSum);
    } else {
        if (orderby == "Nombre")
            users.sort((a, b) => b.name.localeCompare(a.name));
        if (orderby == "Total")
            users.sort((a, b) => b.stats.percent - a.stats.percent);
        if (orderby == "Lecturas")
            users.sort((a, b) => b.stats.reads.percent - a.stats.reads.percent);
        if (orderby == "Ejercicios")
            users.sort((a, b) => b.stats.exercises.percent - a.stats.exercises.percent);
        if (orderby == "Cuestionarios")
            users.sort((a, b) => b.stats.quizzes.percent - a.stats.quizzes.percent);
        if (orderby == "Suma cuestionarios")
            users.sort((a, b) => b.stats.quizzes.scoreSum - a.stats.quizzes.scoreSum);
    }
    return users;
}

function filterUsers(users, search) {
    return users.filter(function(el) {
        return el.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
}