window.onload = () => {
    getNews();
}

function getNews() { // q=${searchForText}
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../data/cohorts.json", true);
    xhr.onload = addNews;
    xhr.onerror = handleError;
    xhr.send();
}

function addNews() {
    const data = JSON.parse(this.responseText);
    console.log(data)
    data.forEach(element => {
        const id = element.id
        console.log(id);
    });
}


function handleError() {
    console.log("Se ha presentado un error");
}

function addNew() {
    const data = JSON.users(this.responseText)
    console.log(data);
}