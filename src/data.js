function pressbutton() {
    Promise.all([
        fetch("../data/lim-2018-03-pre-core-pw/users.json"),
        fetch("../data/lim-2018-03-pre-core-pw/progress.json"),
        fetch("../data/cohorts.json")
    ]).then(
        (DatosJsons) => {
            return Promise.all(DatosJsons.map((Respuesta) => {
                return Respuesta.json();
            }))
        }
    ).then(
        (RespuestaJson) => {
            //computeUsersStats(RespuestaJson[0],RespuestaJson[1],cohorts);
            //aqui es la prueba de como ir obteniendo los datos
            let progress = RespuestaJson[1];
            let user1 = "00hJv4mzvqM3D9kBy3dfxoJyFV82";
            let quizTotal = 0;
            let quizCompleted = 0;
            let scoresum = 0;
            let scorecom = 0;
            var arra1 = progress[user1].intro.units;
            for (var uni in arra1) {
                console.log(arra1[uni]);
                for (var par in arra1[uni].parts) {
                    let elemento = arra1[uni].parts[par];
                    if (elemento.type == "quiz") {
                        console.log(elemento.score);
                        quizTotal++;
                        if (elemento.score) {
                            scoresum = scoresum + elemento.score;
                            scorecom++;
                        }

                        if (elemento.completed == 1)
                            quizCompleted++;
                    }
                }
            }
            let scoreavg = scoresum / scorecom;



            console.log("completado: " + quizCompleted + " - Total: " + quizTotal + " - Promedio: " + scoreavg);

        }
    )
}

function computeUsersStats(users, progress, cohorts) {
    var usuario = {};
    var usuarios = [];
    var stats = {
        percent: "",
        exercises: {
            total: "",
            completed: "",
            percent: ""
        },
        reads: {
            total: "",
            completed: "",
            percent: ""
        },
        quizzes: {
            total: "",
            completed: "",
            percent: "",
            scoreSum: "",
            scoreAvg: ""
        }
    };
    usuario.id = users[0].id;
    usuario.signupCohort = users[0].signupCohort;
    usuario.timezone = users[0].timezone;
    usuario.name = users[0].name;
    usuario.locale = users[0].locale;
    usuario.role = users[0].role;
    usuario.stats = stats;
    usuario.stats.percent = progress[users[0].id].intro.percent;
    //llenar quiz //
    let quizz = progress[users[0].id].intro.units;
    let totalquizz = 0;
    let complequizz = 0;
    let scoresum = 0;
    for (var uni in quizz) {
        for (var par in quizz[uni]) {
            let element = quizz[uni].parts[par];
            if (element.type == "quiz") {
                totalquizz++;
                scoresum = scoresum + element.score;
                if (element.completed == 1)
                    complequizz++;

            }

        }
    }
    usuario.stats.quizzes.total = totalquizz;
    usuario.stats.quizzes.completed =



        console.log(usuario.stats.exercises.total);

}
