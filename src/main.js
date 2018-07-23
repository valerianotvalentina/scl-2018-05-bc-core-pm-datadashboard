function jsonss() {
    let valor = document.getElementById('Menu_dropdown').value;
    cargar(valor);
}

function llenartabla(usuarios) {
    var tbody = '';
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